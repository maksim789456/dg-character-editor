"use client";

import { Provider } from "react-redux";
import { RootState, makeStore } from "@/src/store/store";

export function ReduxProvider({
  children,
  preloadedState,
}: {
  children: React.ReactNode;
  preloadedState?: Partial<RootState>;
}) {
  const store = makeStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
}
