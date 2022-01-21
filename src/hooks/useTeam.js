import { useContext } from "react";
import { TeamContext } from "../contexts/TeamProvider";

export default function useTeam() {
  return useContext(TeamContext);
}
