import React, { useContext, useState, useEffect } from 'react';
import BaseComponent from "../Components/BaseComponent";
import { Button, Buttons } from "../Components/Buttons";
import { Text } from '../Components/Text';
import { Context } from '../Context';
import { navigate } from '@reach/router';
import { Label } from '../Components/Inputs';
import QuestionCards from '../Components/QuestionCards';
import useNotification from '../Components/useNotification';

const QuizMaster = () => {
  const [state, dispatch] = useContext(Context);
  const [questions, setQuestions] = useState([]);
  const [qNo, setQNo] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [newNotification] = useNotification();
  const [allanswered, setAllanswered] = useState(false);

  useEffect(() => {
    if (state.player === null) navigate("/");

    if (state.player !== null) state.socket.emit("qm_init", { roomcode: state.game.roomcode }, (x) => {
      setQuestions(x.questions);
      console.log(x);
    })

    state.socket.on("players_answered", (x) => {
      const playerCount = state.game.players.length - 1;
      const answerCount = Object.keys(x.answers[qNo]).length;
      console.log(playerCount, answerCount);
      if (playerCount === answerCount && !allanswered) newNotification({
        type: "primary",
        title: "Everyone has answered",
        text: "All answers are in!"
      });
      setAllanswered(true);
      setAnswers(x.answers);
    })

    return () => {
      state.socket.off("players_answered")
    }
  }, [])

  const handleClick = (e) => {
    const name = e.currentTarget.name;
    console.log(e.currentTarget.name);
    if (name === "next" && qNo < questions.length - 1) {
      state.socket.emit("qm_next_question", { roomcode: state.game.roomcode }, (x) => {
        console.log(x);
        setAllanswered(false);
        setQNo(x.current);
      });
    }
    if (name === "next" && qNo === questions.length - 1) {
      state.socket.emit("qm_finish_quiz", { roomcode: state.game.roomcode }, (x) => {
        navigate("/scoreboard/" + state.game.roomcode)
      })
    }
  }

  return (
    <BaseComponent title={"Quizmaster"}>
      { questions && questions.length > 0 && <QuestionCards page={qNo} quizmaster data={questions} />}
      <Button fullWidth name="next" color="purple" onClick={handleClick}>{ qNo >= questions.length - 1 ? "Finish Quiz" : "Next question"}</Button>
    </BaseComponent>
  )
}

export default QuizMaster
