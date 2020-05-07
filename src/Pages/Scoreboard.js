import React, { useContext, useState, useEffect } from 'react';
import BaseComponent from "../Components/BaseComponent";
import { Button } from "../Components/Buttons";
import { Text } from '../Components/Text';
import { Context } from '../Context';
import { navigate } from '@reach/router';
import Scores from '../Components/Scores';

const Scoreboard = (props) => {
  const [state] = useContext(Context);
  const [results, setResults] = useState(null);
  useEffect(() => {
     state.socket.emit("game_results", { roomcode: props.gamecode }, (x) => {
      const result = Object.keys(x.results).map(name => {
        return { name: name, score: x.results[name] }
      })
      console.log(result);
      setResults(result);
    })
  }, []);

  const fakeres = Array(10).fill({ name: "Name", score: 5 });

  
  return (
    <BaseComponent title={"Quizooo"}>
    <Text title centered>Here's the results!</Text>
    
    <Scores scores={results} />
    <Button color="purple" onClick={() => navigate("/")}>Exit quiz</Button>
  </BaseComponent>
  )
}

export default Scoreboard
