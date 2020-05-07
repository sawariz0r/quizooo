import React, { useContext, useState, useEffect } from 'react';
import BaseComponent from "../Components/BaseComponent";
import { Text } from "../Components/Text";
import { Label, Input } from "../Components/Inputs";
import { Button } from "../Components/Buttons";
import { navigate } from '@reach/router';
import { Context } from '../Context';

const Login = () => {
  const [state, dispatch] = useContext(Context);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state.player !== null) navigate("/main");
    const savedPlayer = JSON.parse(localStorage.getItem("quizooo_player"));
    console.log(savedPlayer);
    if (savedPlayer !== null) state.socket.emit("player_login", { email: savedPlayer.email, name: savedPlayer.name }, (x) => {
      console.log("Automatic login");
        dispatch({
          type: "SET_PLAYER",
          payload: x
        })
        navigate("/main");
    })
  }, [])

  const handleChange = (e) => {
    setEmail(e.currentTarget.value);
  }

  const handleLogin = () => {
    if (email.length >= 3) {
      state.socket.emit("player_login", { email: email }, (x) => {
        console.log(x);
        dispatch({
          type: "SET_PLAYER",
          payload: x
        })
        navigate("/main");
      })
    }
  }

  if (localStorage.getItem("quizooo_player") !== null) return <BaseComponent title={"Logging in.."} />
  return (
    <BaseComponent title={"quizooo"}>
      <Text marginBottom>Welcome to a slightly different Quiz-app!<br />Created to fit our virtual pubquiz nights.</Text>
      <Label>Email:
      <Input placeholder="Name@namesson.com" type="email" name="name" onChange={handleChange} value={email} />
      </Label>
      <Button fullWidth margin="1rem 0" color="transparent" onClick={handleLogin}>Start quizzing!</Button>

    </BaseComponent>
  )
}

export default Login
