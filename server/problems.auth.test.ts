import { describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  listProblemsForUser: vi.fn().mockResolvedValue([]),
  createProblemForUser: vi.fn().mockResolvedValue({ id: 1 }),
  updateProblemForUser: vi.fn().mockResolvedValue({ id: 1 }),
  deleteProblemForUser: vi.fn().mockResolvedValue({ success: true }),
}));

import { appRouter } from "./routers";
import * as db from "./db";
import type { TrpcContext } from "./_core/context";

function context(user?: TrpcContext["user"]): TrpcContext {
  return { user, req: { protocol: "https", headers: {} } as TrpcContext["req"], res: {} as TrpcContext["res"] };
}

const authenticatedUser = {
  id: 42,
  openId: "user-42",
  email: "user42@example.com",
  name: "User 42",
  loginMethod: "manus",
  role: "user" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

const input = {
  title: "Two Sum",
  platform: "LeetCode",
  difficulty: "easy" as const,
  status: "solved" as const,
  reviewLater: false,
};

describe("problems authentication and isolation", () => {
  it("rejects unauthenticated list access", async () => {
    const caller = appRouter.createCaller(context());
    await expect(caller.problems.list()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("passes the authenticated user ID into every protected operation", async () => {
    const caller = appRouter.createCaller(context(authenticatedUser));
    await caller.problems.list();
    await caller.problems.create(input);
    await caller.problems.update({ id: 7, title: "Updated Two Sum" });
    await caller.problems.delete({ id: 7 });

    expect(db.listProblemsForUser).toHaveBeenCalledWith(42);
    expect(db.createProblemForUser).toHaveBeenCalledWith(42, input);
    expect(db.updateProblemForUser).toHaveBeenCalledWith(42, 7, expect.objectContaining({ title: "Updated Two Sum", platform: "LeetCode", reviewLater: false }));
    expect(db.deleteProblemForUser).toHaveBeenCalledWith(42, 7);
  });
});
