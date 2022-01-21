import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AlertBs({ variant, text, link, linkText }) {
  return (
    <Alert variant={variant}>
      {text}.<br />
      <Alert.Link as={Link} to={link}>
        {linkText}
      </Alert.Link>
    </Alert>
  );
}
