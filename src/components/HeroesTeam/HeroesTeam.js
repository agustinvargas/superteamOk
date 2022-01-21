import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useTeam from "../../hooks/useTeam";
import Chart from "../Chart/Chart";
import styles from "./HeroesTeam.module.css";

export default function HeroesTeam() {
  const { team, removeHero } = useTeam();

  return (
    <Container>
      {team.map((el) => (
        <Row
          className={["shadow-lg my-5 p-3 m-2", styles["row-bg"]]}
          key={el.id}
        >
          <Col className="p-4" md={5}>
            <Card className="shadow-sm border-0">
              <Card.Img variant="top" src={el.image.url} alt={el.name} />
              <Card.Body className={styles["card--body"]}>
                <Card.Title>{el.name}</Card.Title>
                <div className="d-lg-flex align-items-center justify-content-between mt-3">
                  <Button
                    className={[styles.btn, styles["btn--detail"]]}
                    as={Link}
                    to={`/heroe/${el.id}`}
                    variant="primary"
                  >
                    Ver detalles
                  </Button>
                  <Button
                    className={styles.btn}
                    onClick={() => removeHero(el)}
                    variant="danger"
                  >
                    Quitar del equipo
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="p-2 p-lg-5" md={7}>
            <div className={styles["chart-container"]}>
              <Chart
                key={el.id}
                combat={el.powerstats.combat}
                durability={el.powerstats.durability}
                intelligence={el.powerstats.intelligence}
                power={el.powerstats.power}
                speed={el.powerstats.speed}
                strength={el.powerstats.strength}
              />
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
