import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedJudgeProcedure, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import kalasangamaError from "~/utils/customError";
import { get } from "http";
import { Characters, Criteria } from "@prisma/client";

export const JuryRouter= createTRPCRouter({
            getTeams: protectedJudgeProcedure
            .query(async({ctx})=>{
                const teams = await ctx.prisma.team.findMany({
                    include:{
                        criteriaScore: true
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
                const scores = await ctx.prisma.score.findMany({
                    where: {
                        teamID: input.teamId
                    },
                    include: {
                        criteria: true,
                        characterPlayed: true,
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
                score : z.number(),
            })))
            .mutation(async({ctx,input})=>{
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
                if(!criteria)
                    throw new kalasangamaError("ERROR","no such criteria")
                //check if team exists
                const team = await ctx.prisma.team.findUnique({
                    where: {
                        id: input.teamId 
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
                return await ctx.prisma.score.upsert({
                    where: {
                        teamID_criteriaId_characterId: {
                            criteriaId : criteria.id,
                            characterId : character.id,
                            teamID: input.teamId
                        }
                    },
                    update: {
                        score: input.score
                    },
                    create: {
                        criteriaId : criteria.id,
                        characterId : character.id,
                        teamID: input.teamId,
                        score: input.score
                    }
                });
            }),
            updateCriteriaScore: protectedJudgeProcedure
            .input((z.object({
                teamId: z.string(),
                criteriaName: z.nativeEnum(Criteria),
                score : z.number(),
            }))).mutation(async({ctx,input})=>{
                const criteria = await ctx.prisma.criteria.findUnique({
                    where:{
                        name: input.criteriaName
                    }
                });
                return await ctx.prisma.criteriaScore.upsert({
                    where:{
                        id_teamID: {
                            id: criteria.id,
                            teamID: input.teamId
                        }
                    },
                    create: {
                        id: criteria.id,
                        teamID: input.teamId,
                        score: input.score
                    },
                    update: {
                        score: input.score
                    }
                })
            }),
            updateTotalScore: protectedJudgeProcedure
            .input((z.object({
                teamId: z.string(),
                score : z.number(),
                final: z.boolean()
            })))
            .mutation(async({ctx,input})=>{
                if(input.final)
                    return await ctx.prisma.team.update({
                        where:{
                            id: input.teamId
                        },
                        data: {
                            teamScore: input.score,
                            isScored: true
                        }
                    })
                return await ctx.prisma.team.update({
                    where:{
                        id: input.teamId
                    },
                    data: {
                        teamScore: input.score,
                    }
                })
            })
        })


        

