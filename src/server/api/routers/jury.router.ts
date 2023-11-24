import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedJudgeProcedure, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import kalasangamaError from "~/utils/customError";
import { Characters, Criteria } from "@prisma/client";

const schema = z.object({
    "SHANTHANU": z.object({
      CRITERIA_1: z.number(),
      CRITERIA_2: z.number(),
      CRITERIA_3: z.number(),
      CRITERIA_4: z.number(),
    }),
    "MANTRI_SUNEETHI": z.object({
      CRITERIA_1: z.number(),
      CRITERIA_2: z.number(),
      CRITERIA_3: z.number(),
      CRITERIA_4: z.number(),
    }),
    "TAMAALAKETHU": z.object({
      CRITERIA_1: z.number(),
      CRITERIA_2: z.number(),
      CRITERIA_3: z.number(),
      CRITERIA_4: z.number(),
    }),
    "TAAMRAAKSHA": z.object({
      CRITERIA_1: z.number(),
      CRITERIA_2: z.number(),
      CRITERIA_3: z.number(),
      CRITERIA_4: z.number(),
    }),
    "SATHYAVATHI": z.object({
      CRITERIA_1: z.number(),
      CRITERIA_2: z.number(),
      CRITERIA_3: z.number(),
      CRITERIA_4: z.number(),
    }),
    "DAASHARAJA": z.object({
      CRITERIA_1: z.number(),
      CRITERIA_2: z.number(),
      CRITERIA_3: z.number(),
      CRITERIA_4: z.number(),
    }),
    "DEVAVRATHA": z.object({
      CRITERIA_1: z.number(),
      CRITERIA_2: z.number(),
      CRITERIA_3: z.number(),
      CRITERIA_4: z.number(),
    }),
  });

  const totalSchema = z.object({
    CRITERIA_1: z.number(),
    CRITERIA_2: z.number(),
    CRITERIA_3: z.number(),
    CRITERIA_4: z.number()
  })

export const JuryRouter= createTRPCRouter({
            getTeams: protectedJudgeProcedure
            .query(async({ctx})=>{
                const userId = ctx.session.user.id;
                //check if judge exiists if not add to judge table
                const judge = await ctx.prisma.judge.upsert({
                    where:{
                        userId: userId
                    },
                    update: {
                        //nothing to update here
                    },
                    create:{
                        user: {
                            connect:{
                                id: userId
                            }
                        }
                    }
                })
                const teams = await ctx.prisma.team.findMany({
                    include:{
                        teamScore: true,
                        TeamNumber: true
                    }
                });
                return teams;
            }),
            addRemark: protectedJudgeProcedure
            .input((z.object({
                teamId:z.string(),
                remark:z.string(),
            })))
            .mutation(async({ctx,input})=>{
                const team = await ctx.prisma.team.findUnique({
                    where:{
                        id: input.teamId
                    }
                });
                if(!team){
                    throw new kalasangamaError("error","no team");
                }
                const teams = await ctx.prisma.team.update({
                    where:{
                        id: input.teamId
                    },
                    data:{
                        remark: input.remark,
                    }
                })
                return teams;
            }),
            getScores: protectedJudgeProcedure
            .input((z.object({
                teamId:z.string(),
            })))
            .query(async({ctx,input})=>{
                const userId = ctx.session.user.id;
                //check if judge exiists if not add to judge table
                const judge = await ctx.prisma.judge.upsert({
                    where:{
                        userId: userId
                    },
                    update: {
                        //nothing to update here
                    },
                    create:{
                        user: {
                            connect:{
                                id: userId
                            }
                        }
                    }
                })
                const scores = await ctx.prisma.individualScore.findMany({
                    where: {
                        teamID: input.teamId,
                        judgeId: ctx.session.user.id
                    },
                    include: {
                        criteria: true,
                        characterPlayed: true,
                        judge: {
                            include: {
                                teamScore: {
                                    where: {
                                        teamID: input.teamId,
                                        judgeId: ctx.session.user.id
                                    },
                                    include: {
                                        criteria: true,
                                    }
                                },
                                Submitted: {
                                    where: {
                                        teamID: input.teamId,
                                        judgeId: ctx.session.user.id
                                    }
                                }
                            }
                        },
                        team: {
                            include: {
                                college: true
                            }
                        }
                    }
                })
                return scores;
            }),
            updateScores: protectedJudgeProcedure
            .input((z.object({
                teamId: z.string(),
                criteriaName: z.nativeEnum(Criteria),
                characterId: z.nativeEnum(Characters),
                score : z.number().max(30),
            })))
            .mutation(async({ctx,input})=>{
                if(input.criteriaName === "CRITERIA_4" && input.score>10){
                    throw new kalasangamaError("EXCEEDING SCORE LIMIT", "Score should be with 0-10")
                }
                const userId = ctx.session.user.id;
                //check if criteria exists if not add it
                const criteria = await ctx.prisma.criteria.upsert({
                    where: {
                        name: input.criteriaName 
                    },
                    create: {
                        name: input.criteriaName 
                    },
                    update: {
                        //nothing to update
                    }
                });
                //check if chacter exists if not add it
                const character = await ctx.prisma.characterOnUser.upsert({
                    where: {
                        character: input.characterId
                    },
                    create: {
                        character: input.characterId
                    },
                    update: {
                        //nothing to update
                    }
                });
                return await ctx.prisma.individualScore.upsert({
                    where: {
                        teamID_criteriaId_characterId_judgeId: {
                            criteriaId : criteria.id,
                            characterId : character.id,
                            teamID: input.teamId,
                            judgeId: userId
                        }
                    },
                    update: {
                        score: input.score
                    },
                    create: {
                        criteriaId : criteria.id,
                        characterId : character.id,
                        teamID: input.teamId,
                        score: input.score,
                        judgeId: userId
                    }
                });
            }),
            updateCriteriaScore: protectedJudgeProcedure
            .input((z.object({
                teamId: z.string(),
                criteriaName: z.nativeEnum(Criteria),
                score : z.number().max(30),
                final: z.boolean().optional()
            }))).mutation(async({ctx,input})=>{
                if(input.criteriaName === "CRITERIA_4" && input.score>10){
                    throw new kalasangamaError("EXCEEDING SCORE LIMIT", "Score should be with 0-10")
                }
                const userId = ctx.session.user.id;
                //check if criteria exists if not add it
                const criteria = await ctx.prisma.criteria.upsert({
                    where: {
                        name: input.criteriaName 
                    },
                    create: {
                        name: input.criteriaName 
                    },
                    update: {
                        //nothing to update
                    }
                });
                if(input?.final){
                    await ctx.prisma.submitted.upsert({
                        where: {
                            judgeId_teamID: {
                                judgeId: userId,
                                teamID: input.teamId
                            },
                        },
                        update: {
                            submitted: true
                        },
                        create: {
                            judgeId: userId,
                            teamID: input.teamId,
                            submitted: true
                        }
                    })
                }
                return await ctx.prisma.teamScore.upsert({
                    where:{
                        teamID_judgeId_criteriaId: {
                            criteriaId: criteria.id,
                            teamID: input.teamId,
                            judgeId: userId
                        }
                    },
                    create: {
                        criteriaId: criteria.id,
                        teamID: input.teamId,
                        score: input.score,
                        judgeId: userId
                    },
                    update: {
                        score: input.score
                    }
                })
            }),
            getRemark: protectedJudgeProcedure
            .input((z.object({
                teamId: z.string(),
            })))
            .query(async({ctx,input})=>{
                const userId = ctx.session.user.id;
                //check if judge exiists if not add to judge table
                const judge = await ctx.prisma.judge.upsert({
                    where:{
                        userId: userId
                    },
                    update: {
                        //nothing to update here
                    },
                    create:{
                        user: {
                            connect:{
                                id: userId
                            }
                        }
                    }
                })
                return await ctx.prisma.team.findUnique({
                    where: {
                        id: input.teamId
                    },
                    select: {
                        remark: true
                    }
                })
            }),
            scoresUpdate:protectedJudgeProcedure
            .input(z.object({
                scores: schema,
                characters: z.array(z.nativeEnum(Characters)), 
                criteria: z.array(z.nativeEnum(Criteria)),
                teamId: z.string() 
            }))
            .mutation(({ctx,input}) => {
                input.characters.map((character) => {
                    input.criteria.map(async(criteria) => {
                        const characterinfo = await ctx.prisma.characterOnUser.findUnique({
                            where: {
                                character: character
                            },
                        });
                        const criteriainfo = await ctx.prisma.criteria.findUnique({
                            where: {
                                name: criteria
                            }
                        });
                        await ctx.prisma.individualScore.update({
                            where:{
                                teamID_criteriaId_characterId_judgeId:{
                                    teamID: input.teamId,
                                    characterId: characterinfo.id,
                                    judgeId: ctx.session.user.id,
                                    criteriaId: criteriainfo.id
                                }
                            },
                            data:{
                                score: input.scores[character][criteria]
                            }
                        });
                    });
                });
            }),
            totalScoreUpdate: protectedJudgeProcedure
            .input(z.object({
                scores: totalSchema, 
                teamId: z.string(),
                criteria: z.array(z.nativeEnum(Criteria)),
            }))
            .mutation(async({ctx,input}) => {
                input.criteria.map(async (criteria) => {
                    const criteriainfo =  await ctx.prisma.criteria.findUnique({
                        where: {
                            name: criteria
                        }
                    });
                    const res = await ctx.prisma.teamScore.update({
                        where: {
                            teamID_judgeId_criteriaId: {
                                teamID: input.teamId,
                                criteriaId: criteriainfo.id,
                                judgeId: ctx.session.user.id
                            }
                        },
                        data: {
                            score: input.scores[criteria]
                        }
                    })
                });
                await ctx.prisma.submitted.upsert({
                    where: {
                        judgeId_teamID: {
                            teamID: input.teamId,
                            judgeId: ctx.session.user.id
                        }
                    },
                    create: {
                        teamID: input.teamId,
                        judgeId: ctx.session.user.id,
                        submitted: true
                    },
                    update: {
                        submitted: true
                    }
                })
            })
        })


        

