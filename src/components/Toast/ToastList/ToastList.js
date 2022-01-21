import React from "react";
import { ToastContainer } from "react-bootstrap";
import ToastNotify from "../ToastNotify/ToastNotify";

export default function ToastList({ toastList }) {
  return (
    <ToastContainer className="p-3 position-fixed" position="bottom-end">
      {toastList.map((toast) => (
        <ToastNotify
          key={toast.id}
          id={toast.id}
          title={toast.title}
          message={toast.message}
        />
      ))}
    </ToastContainer>
  );
}
