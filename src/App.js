import React, { useContext, useEffect, useState } from 'react';
import { Router, Link } from "@reach/router"; 
import { Context } from './Context';
import BaseComponent from "./Components/BaseComponent";
import { Text } from "./Components/Text";
import Main from './Pages/Main';
import Login from "./Pages/Login";
import CreateRoom from './Pages/CreateRoom';
import Game from './Pages/Game';
import QuizMaster from "./Pages/QuizMaster";
import Scoreboard from './Pages/Scoreboard';
import WaitingForGame from './Pages/WaitingForGame';
import SubmitQuestions from './Pages/SubmitQuestions';

const FourOhFour = () => {
  return (
    <BaseComponent title="404">
      <Text><Link to="/">Couldn't find the page you were looking for. <br /><br />Go back to the main page?</Link></Text>
    </BaseComponent>
  )
}

const App = () => {

  return (
    <Router>
      <Login path="/" />
      <Main path="/main" />
      <CreateRoom path="/newgame" />
      <WaitingForGame path="/waiting/:gamecode" />
      <Game path="/game/:gamecode" />
      <QuizMaster path="/quizmaster/:gamecode" />
      <Scoreboard path="/scoreboard/:gamecode" />
      <SubmitQuestions path="/submitQuestions" />
      <FourOhFour default />
    </Router>
  );
}

export default App;
