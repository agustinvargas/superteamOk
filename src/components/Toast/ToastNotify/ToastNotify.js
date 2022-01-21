import React from "react";
import { Toast } from "react-bootstrap";
import useToast from "../../../hooks/useToast";
import { TOAST_ACTIONS } from "../../../utils/reducers/toastReducer";

export default function ToastNotify({ id, title, message }) {
  const { toastDispatch } = useToast();
  return (
    <Toast
      onClose={() =>
        toastDispatch({ type: TOAST_ACTIONS.REMOVE, payload: { id } })
      }
      delay={3000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
