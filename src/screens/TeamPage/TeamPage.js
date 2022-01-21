import React from "react";
import HeroesTeam from "../../components/HeroesTeam/HeroesTeam";
import useTeam from "../../hooks/useTeam";
import { Redirect } from "react-router";
import TotalTeamStats from "../../components/TotalTeamStats/TotalTeamStats";
import useToast from "../../hooks/useToast";
import { TOAST_ACTIONS } from "../../utils/reducers/toastReducer";

export default function TeamPage() {
  const { team } = useTeam();
  const { toastDispatch } = useToast();

  if (!team.length) {
    toastDispatch({
      type: TOAST_ACTIONS.ADD,
      payload: {
        title: "No tenés miembros en tu equipo",
        message: "Es hora de buscar personajes",
      },
    });
  }

  return team.length ? (
    <>
      <TotalTeamStats />
      <HeroesTeam />
    </>
  ) : (
    <Redirect to={"/buscar"} />
  );
}
