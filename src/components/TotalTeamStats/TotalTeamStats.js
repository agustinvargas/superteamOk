import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AlertBs from "../Alert/Alert";
import Chart from "../Chart/Chart";
import useTeam from "../../hooks/useTeam";

export default function TotalTeamStats() {
  const { team, calcAppearanceAverage, sumPowerstat, calcMax } = useTeam();

  return (
    <Container>
      <h1 className="text-center my-5">Mi equipo</h1>
      <Row className="shadow-lg my-5 mx-2">
        <Col className="p-5" md={6}>
          <h2 className="mb-4">Estadísticas totales</h2>
          <p>
            El equipo se caracteriza por su <strong>{calcMax()}</strong>
          </p>
          <ul>
            <li>Peso promedio: {calcAppearanceAverage("weight")} kg</li>
            <li>Altura promedio: {calcAppearanceAverage("height")} cm</li>
          </ul>
          <div className="my-5">
            {team.length < 6 ? (
              <AlertBs
                variant={"warning"}
                text={"Tu equipo debe estar conformado por seis personajes"}
                link={"/buscar"}
                linkText={"Buscar más"}
              />
            ) : (
              <AlertBs
                variant={"success "}
                text={"¡Excelente! Tu equipo está completo"}
              />
            )}
          </div>
        </Col>
        <Col className="p-2 p-lg-5" md={6}>
          <div style={{ width: "100%", height: "350px" }}>
            <Chart
              combat={sumPowerstat("combat")}
              durability={sumPowerstat("durability")}
              intelligence={sumPowerstat("intelligence")}
              power={sumPowerstat("power")}
              speed={sumPowerstat("power")}
              strength={sumPowerstat("strength")}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
