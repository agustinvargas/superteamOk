import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Loader from "../Loaders/Spinner/Loader";
import { Card, Col, Container, Row } from "react-bootstrap";
import { baseUrl } from "../../utils/api/superHero";
import useToast from "../../hooks/useToast";
import { TOAST_ACTIONS } from "../../utils/reducers/toastReducer";

export default function HeroDetail() {
  const { heroId } = useParams();
  const { toastDispatch } = useToast();
  const [hero, setHero] = useState(null);
  const [loader, setLoader] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function getCharacter() {
      try {
        setLoader(true);
        const query = baseUrl(heroId);
        const res = await query.get();
        const data = res["data"];
        if (data.response === "success") {
          setHero(data);
        } else {
          toastDispatch({
            type: TOAST_ACTIONS.ADD,
            payload: {
              title: "Batiproblemas",
              message: "No hubo resultados para tu búsqueda",
            },
          });
          history.push("/");
        }
      } catch (err) {
        toastDispatch({
          type: TOAST_ACTIONS.ADD,
          payload: {
            title: "API problemas",
            message: `${err}`,
          },
        });
        history.push("/");
      } finally {
        setLoader(false);
      }
    }
    getCharacter();
  }, [heroId, history, toastDispatch]);

  return loader ? (
    <Loader />
  ) : (
    hero?.id === heroId && (
      <Container key={hero.id}>
        <Row className="shadow-lg my-5 p-3 row-bg m-2">
          <Col className="p-4" md={3}>
            <Card className="shadow-sm border-0">
              <Card.Img variant="top" src={hero.image.url} alt={hero.name} />
              <Card.Body>
                <Card.Title>{hero.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col className="p-2 p-lg-5" md={9}>
            <ul>
              <li>Peso: {hero.appearance.weight[1]}</li>
              <li>Altura: {hero.appearance.height[1]}</li>
              <li>Alias: {hero.biography.aliases.join(", ")}</li>
              <li>Color de ojos: {hero.appearance["eye-color"]}</li>
              <li>Color de cabello: {hero.appearance["hair-color"]}</li>
              <li>Lugar de trabajo: {hero.work.base}</li>
            </ul>
          </Col>
        </Row>
      </Container>
    )
  );
}
