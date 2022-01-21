import axios from "axios";

export const crudder = (domain) => (path) => {
  const url = `${domain}/${path}`;

  return {
    get: () => axios.get(url),
    post: (body) => axios.post(url, body),
  };
};
