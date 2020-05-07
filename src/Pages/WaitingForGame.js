import React, { useContext, useEffect, useState } from 'react';
import BaseComponent from "../Components/BaseComponent";
import { Label, Select } from "../Components/Inputs";
import { Buttons, Button } from "../Components/Buttons";
import { Context } from '../Context';
import { Text } from '../Components/Text';
import { navigate } from '@reach/router';
import Styled from 'styled-components';
import useNotification from '../Components/useNotification';

const B = Styled.span`
  font-weight: 700;
`;

const WaitingForGame = (props) => {
  const [state, dispatch] = useContext(Context);
  const [quiz, setQuiz] = useState(null);
  const [quizname, setQuizname] = useState(null);
  const [newNotification] = useNotification();

  useEffect(() => {
    if (state.player === null) navigate("/");

    state.socket.on("player_joined", (x) => {
      dispatch({
        type: "PLAYER_JOINED",
        payload: x
      })
    });
    state.socket.on("game_started", (x) => {
      console.log(x);
      navigate("/game/" + x.roomcode);
    });
    state.socket.on("player_left", (x) => {
      dispatch({
        type: "PLAYER_LEFT",
        payload: x
      })
    });
    state.socket.on("gm_changed_quiz", (x) => {
      setQuizname(x.title);
      newNotification({
        title: "Quiz changed",
        text: "Quizmaster changed the quiz",
        type: "primary"
      })
    })
    return () => {
      state.socket.off("player_joined");
      state.socket.off("game_started");
      state.socket.off("gm_changed_quiz");
      state.socket.off("player_left");
    }
  }, [])

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    state.socket.emit("gm_change_quiz", { quizid: value, roomcode: state.game.roomcode }, (x) => {
      setQuiz(value);
    })
  }

  const handleLeave = () => {

  };

  const handleStart = () => {
    state.socket.emit("game_start", { roomcode: state.game.roomcode, quizid: quiz }, (x) => {
      console.log(state.game.roomcode, quiz);
      if (x.roomcode) {
        navigate("/quizmaster/" + state.game.roomcode)
      }
    })
  };

  const randomJoinPhrase = (index) => {
    const phrases = ["created the game", "was the second quickest", "dropped in", "is in the house", "sneaked in", "actually showed up", "just waltzed in", "felt like quizzing", "finally got here", "got lost, but made it here somehow"];
    return phrases[index];
  }

  if (state.player === null) return <div></div>

  return (
    <BaseComponent title={"Now we wait.."}>
      <Text noMargin style={{}}>
        <B>Game name:</B> {state.game.roomname} <br />
        <B>Code:</B> {state.game.roomcode} <br />
        <B>Quiz:</B> {quizname ? quizname : "Not chosen yet"} <br />
        {
          state.game.players.length === state.game.maxPlayers ?
            <Text marginBottom>The room is full. <br /> Everyone ready?</Text>
            : <Text marginBottom style={{ fontSize: "1.5rem" }}>
              <span style={{ fontWeight: "700" }}>Players: ({state.game.players.length} / {state.game.maxPlayers})</span><br />
              {state.game.players.map((x, i) => {
                if (x.playerid === state.player.playerid) return <span key={state.player.playerid + i}>You've joined<br /></span>
                return <span key={state.player.playerid + i}>{x.name} {randomJoinPhrase(i)} <br /></span>
              })}
            </Text>
        }
      </Text>
      {state.game.quizmaster.playerid === state.player.playerid && (
        <Label>Pick a quiz:
          <Select onChange={handleChange} options={state.quizlist} />
        </Label>
      )}

      {
        state.game.quizmaster.playerid === state.player.playerid ?
          <Buttons>
            <Button color="danger" onClick={handleLeave}>Leave</Button>
            <Button color={state.game.players.length > 2 ? "correct" : "transparent"} onClick={handleStart}>Start</Button>
          </Buttons>
          :
          <Button color="danger" onClick={handleLeave}>Leave</Button>
      }

    </BaseComponent >
  )
}

export default WaitingForGame
