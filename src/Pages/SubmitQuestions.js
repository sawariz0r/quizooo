import React, { useState, useContext } from 'react';
import BaseComponent from "../Components/BaseComponent";
import { Label, TextArea, Input } from "../Components/Inputs";
import { Buttons, Button, DeleteButton } from "../Components/Buttons";
import { navigate } from '@reach/router';
import { Text } from '../Components/Text';
import { Context } from '../Context';
import useNotification from '../Components/useNotification';

const SubmitQuestions = () => {
  const [state] = useContext(Context);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newNotification] = useNotification();

  const autosize = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  } 

  const handleTitleChange = (e) => {
    const value = e.currentTarget.value;
    setTitle(value);
  }
 
  const handleTextAreaChange = (e, i) => {
    const newQuestions = [...questions];
    newQuestions[i] = e.target.value;
    setQuestions(newQuestions);
  }

  const handleNewQuestion = () => {
    if (questions.length < 19) {
      setQuestions([...questions, ""])
    }
  }

  const handleDelete = (e, elIndex) => {
    let newQuestions = [...questions].filter((x, i) => i !== elIndex);
    setQuestions(newQuestions);
  }

  const handleSave = () => {
    if (questions.length > 0) {
      state.socket.emit("quiz_add", { questions: questions, title: title } , (x) => {
        if (x.hasOwnProperty("title")) {
          newNotification({
            title: "Quiz added",
            text: "You have successfully added the Quiz!",
            type: "success"
          })
        } else if (!x.hasOwnProperty("title")) {
          newNotification({
            title: "Something went wrong",
            text: "Something didn't go quite right. Did you exceed the 20 question-limit?",
            type: "secondary"
          })
        }
      })
    }
  }

  return (
    <BaseComponent title={"New Quiz"}>
      <Text style={{ fontSize: "1.4rem", fontWeight: "500"}} infoText>Please write the question on the first line and the questions on separate lines after that. <br />First answer is the correct one.</Text>
      <Label>Quiz title
        <Input name="title" placeholder="Title goes here"
         onChange={handleTitleChange} value={title} fullWidth />
      </Label>
      {
        questions.map((x, i) => {
          return (
            <Label onClick={e => e.preventDefault()}>Question #{i + 1}
              <DeleteButton right="0px" top="0px" onClick={(e) => handleDelete(e, i)}>Delete</DeleteButton>
              <TextArea onKeyDown={autosize} onBlur={(e) => handleTextAreaChange(e, i)} name="Question" placeholder="Question first, answers on separate lines. Mark the correct question(s) with a *-sign before the question" />
            </Label>
          )
        })
      }
        <Button color="purple" onClick={handleNewQuestion} fullWidth style={{ margin: "1rem" }} >New question</Button>
      <Buttons>
        <Button color="secondary" onClick={() => navigate("/main")}>Cancel</Button>
        <Button onClick={handleSave} color="correct">Save quiz</Button>
      </Buttons>

    </BaseComponent>
  )
}

export default SubmitQuestions
