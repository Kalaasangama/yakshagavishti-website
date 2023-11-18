import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedJudgeProcedure, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import kalasangamaError from "~/utils/customError";
import { get } from "http";

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
                const scores = ctx.prisma.score.findMany({
                    where: {
                        teamID: input.teamId
                    },
                    include: {
                        criteria: true,
                    }
                })
                return scores;
            })
        })


        

