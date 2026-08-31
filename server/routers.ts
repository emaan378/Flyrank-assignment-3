import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createProblemForUser, deleteProblemForUser, listProblemsForUser, updateProblemForUser } from "./db";

const problemInput = z.object({
  title: z.string().trim().min(1).max(255),
  platform: z.string().trim().max(64).default("LeetCode"),
  url: z.string().trim().max(1024).optional().nullable(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  status: z.enum(["solved", "in-progress"]),
  topic: z.string().trim().max(128).optional().nullable(),
  notes: z.string().optional().nullable(),
  approach: z.string().optional().nullable(),
  timeComplexity: z.string().trim().max(64).optional().nullable(),
  spaceComplexity: z.string().trim().max(64).optional().nullable(),
  mistakes: z.string().optional().nullable(),
  reviewLater: z.boolean().default(false),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(({ ctx }) => ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    }),
  }),
  problems: router({
    list: protectedProcedure.query(({ ctx }) => listProblemsForUser(ctx.user.id)),
    create: protectedProcedure.input(problemInput).mutation(({ ctx, input }) => createProblemForUser(ctx.user.id, input)),
    update: protectedProcedure.input(problemInput.partial().extend({ id: z.number().int().positive() })).mutation(({ ctx, input }) => {
      const { id, ...changes } = input;
      return updateProblemForUser(ctx.user.id, id, changes);
    }),
    delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => deleteProblemForUser(ctx.user.id, input.id)),
  }),
});

export type AppRouter = typeof appRouter;
