import React, { useContext, useState, useEffect } from 'react';
import BaseComponent from "../Components/BaseComponent";
import { Text } from '../Components/Text';
import { QOptions } from '../Components/Buttons';
import { Context } from '../Context';
import { navigate } from '@reach/router';
import QuestionCards from '../Components/QuestionCards';
import { Label } from '../Components/Inputs';

const Game = (props) => {
  const [state, dispatch] = useContext(Context);
  const [qNo, setQNo] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    //if (state.player === null) navigate("/");
    if (questions.length === 0) {
      state.socket.emit("get_game_state", { roomcode: props.gamecode }, (x) => {
        setQNo(x.current);
        setQuestions(x.questions);
        console.log(x);
      })
    }
    state.socket.on("next_question", (x) => {
      setQNo(x.current)
      setSelectedAnswer(null);
    });
    state.socket.on("finish_quiz", (x) => {
      navigate("/scoreboard/" + state.game.roomcode);
    })
    return () => {
      state.socket.off("next_question");
      state.socket.off("finish_quiz")
    }
  }, [])

  const handleAnswer = (x) => {
    console.log(x);
    setSelectedAnswer(x);
    state.socket.emit("player_answer", { roomcode: state.game.roomcode, questionNo: qNo, answer: x });
  }

  return (
    <BaseComponent title={"Quiz Time!"}>
      { questions && questions.length > 0 ? 
      <QuestionCards page={qNo} selectedAnswer={selectedAnswer} handleAnswer={handleAnswer} data={questions} />
      : 
      <Label>Loading..</Label>
    }
    </BaseComponent>
  )
}

export default Game
