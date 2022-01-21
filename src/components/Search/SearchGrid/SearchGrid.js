import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import useTeam from "../../../hooks/useTeam";
import { SearchContext } from "../../../contexts/SearchProvider";
import { baseUrl } from "../../../utils/api/superHero";
import Loader from "../../Loaders/Spinner/Loader";
import useToast from "../../../hooks/useToast";
import { TOAST_ACTIONS } from "../../../utils/reducers/toastReducer";

export default function SearchGrid() {
  const [loader, setLoader] = useState(false);
  const { keyword, setKeyword } = useContext(SearchContext);
  const { keywordSearch } = useParams();
  const { addHero } = useTeam();
  const { toastDispatch } = useToast();
  const history = useHistory();

  useEffect(() => {
    async function gettingCharacters() {
      try {
        setLoader(true);
        const query = baseUrl(`search/${keywordSearch}`);
        const get = await query.get();
        const data = get.data;
        const res = data.results;
        if (res) {
          setKeyword({
            value: keywordSearch,
            results: res,
          });
        } else {
          toastDispatch({
            type: TOAST_ACTIONS.ADD,
            payload: {
              title: "Batiproblemas",
              message: "Tu búsqueda no arrojó resultados",
            },
          });
          history.push("/buscar");
        }
      } catch (err) {
        toastDispatch({
          type: TOAST_ACTIONS.ADD,
          payload: {
            title: "API problemas",
            message: `${err}`,
          },
        });
        history.push("/buscar");
      } finally {
        setLoader(false);
      }
    }
    gettingCharacters();
  }, [history, keywordSearch, toastDispatch, setKeyword]);

  return loader ? (
    <Loader />
  ) : (
    keyword && (
      <Container className="m-auto">
        <h3 className="text-center my-5">
          Resultados para <strong>{keyword.value}</strong>:{" "}
          {keyword.results.length}
        </h3>
        <Row>
          {keyword.results.map((el) => (
            <Col className="p-4" md={4} key={el.id}>
              <Card className="shadow">
                <Card.Img variant="top" src={el.image.url} alt={el.name} />
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <Card.Title>{el.name}</Card.Title>
                  <Button onClick={() => addHero(el)} variant="primary">
                    Agregar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
  );
}
