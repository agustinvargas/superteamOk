import { crudder } from "./crudder";

export const baseUrl = crudder(
  `https://www.superheroapi.com/api.php/${process.env.REACT_APP_SUPERHERO_TOKEN}`
);
