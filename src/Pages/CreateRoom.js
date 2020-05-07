import React, { useState, useContext, useEffect } from 'react';
import BaseComponent from "../Components/BaseComponent";
import { Label, Input, Slider } from "../Components/Inputs";
import { Buttons, Button } from "../Components/Buttons";
import { Text } from "../Components/Text";
import { navigate } from '@reach/router';
import { Context } from '../Context';

const CreateRoom = () => {
  const [state, dispatch] = useContext(Context);
  const [gameSettings, setGameSettings] = useState({
    public: false,
    maxPlayers: 3,
    roomname: "",
  })

  useEffect(() => {
    if (state.player === null) navigate("/");
  }, [])

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setGameSettings({ ...gameSettings, [name]: value });
  }

  const handleCreateGame = () => {
    if (gameSettings.roomname !== "" && gameSettings.roomname.length > 1 && gameSettings.roomname.length < 10) {
      state.socket.emit("game_create", { ...gameSettings, name: state.player.name }, (x) => {
        console.log(x);
        if (x.roomcode) {
          dispatch({
            type: "JOIN_GAME",
            payload: x
          })
          state.socket.emit("get_quiz_data", "", (y) => {
            dispatch({
              type: "UPDATE_QUIZLIST",
              payload: y
            })
            navigate("/waiting/" + x.roomcode)
          })
        }
      })
    }
  };

  return (
    <BaseComponent title={"New game"}>
      <Text>Hey there, Quizmaster! Are you ready to quiz you friends?</Text>
      <Label>Room name
        <Input placeholder='Length: > 1 and < 10' name="roomname" onChange={handleChange} />
      </Label>
      <Label>Max amount of players ({gameSettings.maxPlayers})
        <Slider type="range" min="3" max="10" name="maxPlayers" onChange={handleChange} value={gameSettings.maxPlayers} />
      </Label>
      <Label>Want others to see your game?
        <Button margin="0.5rem 0 2rem 0" fullWidth color={gameSettings.public ? "primary" : "secondary"} onClick={() => setGameSettings({ ...gameSettings, public: !gameSettings.public })}>{gameSettings.public ? "Yes" : "No"}</Button>
      </Label>
      <Buttons>
        <Button color="danger" onClick={() => navigate("/main")}>Cancel</Button>
        <Button color="correct" onClick={handleCreateGame}>Create game</Button>
      </Buttons>

    </BaseComponent>
  )
}

export default CreateRoom
