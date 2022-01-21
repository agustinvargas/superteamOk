import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <h1>Página no encontrada</h1>
      <Button as={Link} to="/" className="my-4">
        Comenzar desde el inicio
      </Button>
    </>
  );
}
