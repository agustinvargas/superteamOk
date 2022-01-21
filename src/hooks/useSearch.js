import { useContext } from "react";
import { SearchContext } from "../contexts/SearchProvider";

export default function useSearch() {
  return useContext(SearchContext);
}
