import React, { useContext, useState, useEffect } from 'react';
import BaseComponent from "../Components/BaseComponent";
import { Label, Input } from "../Components/Inputs";
import { Buttons, Button, GameListCard } from "../Components/Buttons";
import { navigate } from '@reach/router';
import { Context } from '../Context';
import { Text, CenterText } from '../Components/Text';
import { Frame, Scroll } from "framer";
import useNotification from '../Components/useNotification';

const Main = () => {
  const [state, dispatch] = useContext(Context);
  const [name, setName] = useState();
  const [roomcode, setRoomcode] = useState("");
  const [publicGames, setPublicGames] = useState([]);
  const [newNotification] = useNotification();

  useEffect(() => {
    if (state.player === null) navigate("/");
    if (state.player !== null) {
      setName(state.player.name);

      state.socket.emit("get_public_games", {}, (x) => {
        console.log(x);
        setPublicGames(x.games);
      })
      state.socket.on("update_public_games", (x) => {
        setPublicGames(x.games);
      })

      state.socket.emit("get_high_scores", {}, (x) => {

      })
      state.socket.on("update_high_scores", {}, (x) => {

      })
    }
    return () => {
      state.socket.off("update_public_games");
      state.socket.off("update_high_scores");
    }
  }, []);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const elName = e.currentTarget.name;
    if (elName === "roomcode") setRoomcode(value.toUpperCase());
    if (elName === "name") {
      if (value.length > 1 && value.length < 16) {
        state.socket.emit("name_change", { name: value, playerid: state.player.playerid }, (x) => {
          if (x.playerid) {
            dispatch({
              type: "SET_PLAYER",
              payload: x
            })
          } else if (!x.hasOwnProperty("playerid")) {
            newNotification({
              title: "Couldn't save name",
              text: "Names must be more than 1 letters and less than 16",
              type: "danger"
            })
          }
        });
      }

      setName(value);
    }
  }

  const handleJoinGame = () => {
    if (roomcode.length === 4) {
      state.socket.emit("game_join", { name: state.player.name, roomcode: roomcode }, (x) => {
        if (x.roomcode) {
          dispatch({
            type: "JOIN_GAME",
            payload: x
          });
          navigate("/waiting/" + x.roomcode)
        } else if (!x.hasOwnProperty("roomcode")) {
          newNotification({
            title: "Wrong Gamecode",
            text: "Please check if you entered all 4 digits and that there's no typos",
            type: "danger"
          })
        }
      })
    } else {
      newNotification({
        title: "Wrong Gamecode",
        text: "Please check if you entered all 4 digits and that there's no typos",
        type: "danger"
      })
    }
  }
  if (state.player === null) return (<div></div>)

  const games = Array(5).fill({ title: "Game", owner: "Shelby", players: "5", maxPlayers: "10", code: "EKOE" });
  const scores = Array(10).fill({ player: "Oscar", score: "100" });

  return (
    <BaseComponent title={"quizooo"}>
      <CenterText marginBottom>A Quizmaster-style Quiz game</CenterText>

      <Label>Your name
      <Input name="name" onChange={handleChange} onFocus={() => setName("")} onBlur={(e) => { e.currentTarget.value === "" && setName(state.player.name) }} value={name} placeholder="Your name here" />
      </Label>

      <Label style={{ marginBottom: "15px" }}>Public games</Label>
      <Scroll direction="horizontal" width="100vw" height="100px" position="relative" draggable={{ overdrag: true }} style={{ marginBottom: "25px" }}>
        {publicGames && publicGames.length > 0 ? publicGames.map((x, i) => {
          return (
            <GameListCard width={150} key={x.roomcode} i={i} onTap={() => setRoomcode(x.roomcode)} {...x} />
          )
        })
          :
          <Text centered infoText style={{ marginLeft: "5vw" }}>Sorry, there's no public games at the moment.</Text>
        }
      </Scroll>

      <Label>Got a game code?
        <Input maxLength="4" name="roomcode" onFocus={() => setRoomcode("")} style={{ width: "70%" }} onChange={handleChange} value={roomcode} placeholder="Code goes here" />
        <Button color="correct" onClick={handleJoinGame} style={{ position: "absolute", right: "0", top: "33px" }}>Join</Button>
      </Label>

      <Label style={{ marginBottom: "15px" }}>High scores</Label>
      <Scroll direction="horizontal" width="100vw" height="60px" position="relative" draggable={{ overdrag: true }}>
        {scores.map((x, i) => {
          return <Frame style={{ padding: "3px 10px", boxSizing: "border-box" }} width="100px" height="60px" left={((i * 110) + 20) + "px"} background={"linear-gradient(209.19deg, rgba(253, 251, 251, 0.3) 5.08%, rgba(235, 237, 238, 0.3) 89.77%)"} radius="5px">
            <span style={{ fontSize: "1.3rem" }}>{x.player}:</span> <br />
            <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>{x.score} points</span>
          </Frame>
        })
        }
      </Scroll>

      <Label style={{ margin: "25px 0 10px 0" }}>What's Quizoo?</Label>
      <Text infoText>
        This game is slightly different compared to most Quiz games out there. <br /> <br />
        Instead of everyone taking the Quiz, it's more like a tool for hosting a Quiz and being the Quizmaster for your friends, your colleagues and so on. <br /> <br />
        So we could use our phones and effectively Quiz eachother during Lockdown Quiz nights :)
      </Text>
      <Label style={{ margin: "15px 0" }}>Preparing to be the Quizmaster?</Label>
      <Button fullWidth margin="0" color="primary" onClick={() => navigate("/newgame")}>Start a new Quiz game</Button>
      <Button fullWidth margin="0.5rem 0" color="transparent" onClick={() => navigate("/submitQuestions")}>Submit your own Quiz</Button>

    </BaseComponent>
  )
}

export default Main
