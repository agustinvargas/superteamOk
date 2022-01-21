import React, { createContext, useReducer } from "react";
import useToast from "../hooks/useToast";
import { teamReducer, TEAM_ACTIONS } from "../utils/reducers/teamReducer";
import { TOAST_ACTIONS } from "../utils/reducers/toastReducer";

export const TeamContext = createContext();

export default function TeamProvider({ children }) {
  const initialState = [];
  const [team, teamDispatch] = useReducer(teamReducer, initialState);
  const { toastDispatch } = useToast();

  // Limit of team members
  const teamLimit = 6;

  // Validates functions
  // Validate that a character is already added
  const isAdded = (id) => team.some((el) => el.id === id);
  // Validate the alignment hero (in the team, there must be three good character and three bad character)
  const alignmentCounts = (alignmentType) => {
    return team.filter((el) => el.biography.alignment === alignmentType).length;
  };
  const alignmentCheck = (hero) => {
    const alignment = hero.biography.alignment;
    const limit = 3;

    if (alignment === "good") {
      const goodHeroesCounts = alignmentCounts("good");
      if (goodHeroesCounts === limit) return "good limit";
    }

    if (alignment === "bad") {
      const badHeroesCounts = alignmentCounts("bad");
      if (badHeroesCounts === limit) return "bad limit";
    }

    return false;
  };

  // Add character to the team
  const addHero = (hero) => {
    switch (true) {
      case team.length === teamLimit:
        toastDispatch({
          type: TOAST_ACTIONS.ADD,
          payload: {
            title: `No se pudo agregar a ${hero.name}`,
            message: "Tu equipo ya está completo",
          },
        });
        break;
      case team.length === 0:
        teamDispatch({ type: TEAM_ACTIONS.ADD, payload: hero });
        if (teamLimit - 1 - team.length === 0) {
          toastDispatch({
            type: TOAST_ACTIONS.ADD,
            payload: {
              title: `Agregaste a ${hero.name} a tu equipo`,
              message: "Completaste tu equipo",
            },
          });
        } else {
          toastDispatch({
            type: TOAST_ACTIONS.ADD,
            payload: {
              title: `Agregaste a ${hero.name} a tu equipo`,
              message: `Tenés que agregar a ${
                teamLimit - 1 - team.length
              } personaje/s más`,
            },
          });
        }
        break;
      case isAdded(hero.id):
        toastDispatch({
          type: TOAST_ACTIONS.ADD,
          payload: {
            title: "Batiproblemas",
            message: `${hero.name} ya está en tu equipo`,
          },
        });
        break;
      case alignmentCheck(hero) === "good limit":
        toastDispatch({
          type: TOAST_ACTIONS.ADD,
          payload: {
            title: "Batiproblemas",
            message:
              "Hay tres héroes en tu equipo. Es momento de agregar un villano",
          },
        });
        break;
      case alignmentCheck(hero) === "bad limit":
        toastDispatch({
          type: TOAST_ACTIONS.ADD,
          payload: {
            title: "Batiproblemas",
            message:
              "Hay tres villanos en tu equipo. Es momento de agregar un héroe",
          },
        });
        break;
      default:
        teamDispatch({ type: TEAM_ACTIONS.ADD, payload: hero });
        if (teamLimit - 1 - team.length === 0) {
          toastDispatch({
            type: TOAST_ACTIONS.ADD,
            payload: {
              title: `Agregaste a ${hero.name} a tu equipo`,
              message: "Completaste tu equipo",
            },
          });
        } else {
          toastDispatch({
            type: TOAST_ACTIONS.ADD,
            payload: {
              title: `Agregaste a ${hero.name} a tu equipo`,
              message: `Tenés que agregar a ${
                teamLimit - 1 - team.length
              } personaje/s más`,
            },
          });
        }
        break;
    }
  };

  // Remove a hero from the team
  const removeHero = (hero) => {
    teamDispatch({ type: TEAM_ACTIONS.REMOVE, payload: hero });

    toastDispatch({
      type: TOAST_ACTIONS.ADD,
      payload: {
        title: `Quitaste a ${hero.name} de tu equipo`,
        message: `Tenés que agregar a ${
          teamLimit + 1 - team.length
        } personajes más`,
      },
    });
  };

  // Calculate total powerstats
  const sumPowerstat = (powerstat) => {
    const reduce = team.reduce((acc, cur) => {
      return acc + parseInt(cur.powerstats[powerstat]);
    }, 0);
    return reduce;
  };

  // Calculate the average height and weight of the team
  const calcAppearanceAverage = (checkAppearance) => {
    const reduce = team.reduce((acc, cur) => {
      return acc + parseInt(cur.appearance[checkAppearance][1]);
    }, 0);
    return Math.round(reduce / team.length);
  };

  // Get max powerstat
  const calcMax = () => {
    const arr = [
      { powerstat: "combate", value: sumPowerstat("combat") },
      { powerstat: "resistencia", value: sumPowerstat("durability") },
      { powerstat: "inteligencia", value: sumPowerstat("intelligence") },
      { powerstat: "poder", value: sumPowerstat("power") },
      { powerstat: "velocidad", value: sumPowerstat("speed") },
      { powerstat: "fuerza", value: sumPowerstat("strength") },
    ];
    const sort = arr.sort((a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    });
    return sort[0].powerstat;
  };

  const contextValue = {
    team,
    addHero,
    removeHero,
    sumPowerstat,
    calcAppearanceAverage,
    calcMax,
  };

  return (
    <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
  );
}
