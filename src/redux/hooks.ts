// import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
// type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
// type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
// type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

// export function isPendingAction(action: AnyAction) {
//   return action.type.endsWith("/pending");
// }
// export function isFulfilledAction(action: AnyAction) {
//   return action.type.endsWith("/fulfilled");
// }
// export function isRejectedAction(action: AnyAction) {
//   return action.type.endsWith("/rejected");
// }
