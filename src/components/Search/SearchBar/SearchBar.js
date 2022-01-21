import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import LoaderBtn from "../../Loaders/Button/LoaderBtn";
import { baseUrl } from "../../../utils/api/superHero";
import useSearch from "../../../hooks/useSearch";
import useToast from "../../../hooks/useToast";
import { TOAST_ACTIONS } from "../../../utils/reducers/toastReducer";

export default function SearchBar() {
  const [loader, setLoader] = useState(false);
  const { setKeyword } = useSearch();
  const { toastDispatch } = useToast();
  const history = useHistory();

  async function gettingCharacter(userKeyword) {
    try {
      setLoader(true);
      const query = baseUrl(`search/${userKeyword}`);
      const get = await query.get();
      const data = get.data;
      const res = data.results;
      if (res) {
        setKeyword({
          value: userKeyword,
          results: res,
        });
        history.push(`/buscar/${userKeyword}`);
      } else {
        toastDispatch({
          type: TOAST_ACTIONS.ADD,
          payload: {
            title: "Batiproblemas",
            message:
              "No se encontraron resultados. Intentá buscando otro personaje",
          },
        });
      }
    } catch (err) {
      toastDispatch({
        type: TOAST_ACTIONS.ADD,
        payload: {
          title: "API problemas",
          message: `${err}`,
        },
      });
    } finally {
      setLoader(false);
    }
  }

  return (
    <Formik
      initialValues={{
        search: "",
      }}
      validate={(val) => {
        const err = {};

        // Validate search
        if (!val.search) {
          err.search = "Por favor, ingresá el nombre de un personaje";
        } else if (!/^[a-zA-Z ]+((['][a-zA-Z ]))*$/.test(val.search)) {
          err.search = "Por favor, ingresá el nombre de un personaje válido";
        }

        return err;
      }}
      onSubmit={(val, { resetForm }) => {
        gettingCharacter(val.search);
        resetForm();
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="searchForm" visuallyHidden>
            Buscá un personaje
          </Form.Label>
          <Form.Control
            id="searchForm"
            placeholder="Buscar personaje"
            name="search"
            className="mb-2 mt-5"
            value={values.search}
            onChange={handleChange}
            onBlur={handleBlur}
            type="search"
          />

          {loader ? (
            <LoaderBtn text="Buscando" />
          ) : (
            <Button className="w-100 my-2" type="submit">
              Buscar
            </Button>
          )}

          {touched.search && errors.search && <small>{errors.search}</small>}
        </Form>
      )}
    </Formik>
  );
}
