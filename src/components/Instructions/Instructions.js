import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Instructions() {
  return (
    <Container className="p-5">
      <h1 className="text-center mb-5">Creá tu equipo de superhéroes</h1>
      <main className="shadow p-5">
        <h3 className="mb-4">Instrucciones</h3>
        <ul>
          <li>
            En el{" "}
            <strong>
              <Link to="/buscar">buscador</Link>
            </strong>{" "}
            podrás encontrar a tu personaje de cómic favorito para sumarlo a tus
            filas.
          </li>
          <li>
            Tu equipo debe estar conformado por seis personajes. El mismo puede
            tener hasta tres héroes y tres villanos.
          </li>
          <li>
            Cada personaje tiene sus propias cualidades (fuerza, combate,
            resistencia, inteligencia, velocidad y poder), entre otros detalles.
          </li>
          <li>
            Consultá las estadísticas totales de tu{" "}
            <strong>
              <Link to="/equipo">equipo</Link>
            </strong>
            . La cualidad primordial será la que lo caracterizará para el
            combate.
          </li>
        </ul>
      </main>
    </Container>
  );
}
