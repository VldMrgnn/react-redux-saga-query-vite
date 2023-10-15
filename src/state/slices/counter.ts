import { createAssign } from "robodux";
import { select } from "saga-query";
import { createSelector } from "reselect";
import { thunks } from "@app/state/apis";
import type { Next } from "saga-query";
import type { RootState } from "@app/state/rootState";
import type { TCounterPayload } from "@app/types";
import type { ThunkCtx } from "@app/types/state";

type TCounter = {
  count: any;
};

const REPO_NAME = "counter";
export const counterRepo = createAssign<any>({
  name: REPO_NAME,
  initialState: { count: 0 }
});

const counterSelectors = (state: RootState) => state[REPO_NAME];
export const selectCounter = createSelector(counterSelectors, (v) => v.count);

export const counterOp = thunks.create<TCounterPayload>(
  `counterOperations`,
  function* (ctx: ThunkCtx, next: Next) {
    const { type, payload } = ctx.payload;
    const currentCount = yield* select(selectCounter);
    switch (type) {
      case "increment":
        ctx.actions.push(counterRepo.actions.set({ count: currentCount + 1 }));
        break;
      case "decrement":
        ctx.actions.push(counterRepo.actions.set({ count: currentCount - 1 }));
        break;
      case "reset":
        ctx.actions.push(counterRepo.actions.set({ count: 0 }));
        break;
      case "set":
        ctx.actions.push(counterRepo.actions.set({ count: payload as number }));
        break;
      default:
        break;
    }
    yield next();
  }
);
