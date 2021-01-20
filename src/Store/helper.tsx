import { AnyAction } from "@reduxjs/toolkit";

const hasPrefix = (action: AnyAction, prefix: string) =>
  action.type.startsWith(prefix);
const isPending = (action: AnyAction) => action.type.endsWith("/pending");
const isFulfilled = (action: AnyAction) => action.type.endsWith("/fulfilled");
const isRejected = (action: AnyAction) => action.type.endsWith("/rejected");

export const isPendingAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isPending(action);
};

export const isRejectedAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isRejected(action);
};

export const isFulfilledAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isFulfilled(action);
};
