import React, { createContext, useReducer } from "react";
import { createPortal } from "react-dom";
import ToastList from "../components/Toast/ToastList/ToastList";
import { toastReducer } from "../utils/reducers/toastReducer";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const initialState = [];
  const [toast, toastDispatch] = useReducer(toastReducer, initialState);
  const contextValue = { toast, toastDispatch };
  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {createPortal(<ToastList toastList={toast} />, document.body)}
    </ToastContext.Provider>
  );
};
