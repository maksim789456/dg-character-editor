import store, { persistor } from "@/src/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";

function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default ReduxProvider;
