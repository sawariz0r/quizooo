import React, { createContext, useReducer } from 'react';
import io from "socket.io-client";

export const Context = createContext();
export const theme = {
  color: {
    danger: "#dc3545",
    secondary: "#EF767A",
    primary: "#3586C2",
    transparent: "transparent",
    correct: "#50FFB199",
    purple: "#6078BC",
    yellow: "#FFEF9F"
  }
};
const initialState = {
  socket: io("https://vivacious-stellar-nut.glitch.me/"),
  player: null,
  game: null,
  notifications: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PLAYER":
      localStorage.setItem("quizooo_player", JSON.stringify(action.payload));
      return {
        ...state,
        player: action.payload
      }
    case "SET_QUIZ":
      return {
        ...state,
        game: {
          ...state.game,
        }
      }
    case "JOIN_GAME":
      return {
        ...state,
        game: action.payload
      };
    case "UPDATE_QUIZLIST": 
      const newQuizlist = action.payload;
      return {
        ...state,
        quizlist: newQuizlist
      }
    case "PLAYER_JOINED": 
      return {
        ...state,
        game: {
          ...state.game,
          players: [...state.game.players, action.payload]
        }
      }
    case "PLAYER_LEFT":
      return {
        state,
        game: {
          ...state.game,
          players: [...state.game.players].filter(x => x.playerid !== action.payload)
        }
      }
    case "CLOSE_NOTIFICATION":
      const id = action.payload;
      return {
        ...state,
        notifications: [...state.notifications].filter(x => x.id !== id)
      }
    case "NEW_NOTIFICATION":
      const notification = action.payload;
      return {
        ...state,
        notifications: [...state.notifications,
        notification]
      }
    default:
      return state;
  }
}

export const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  )
}