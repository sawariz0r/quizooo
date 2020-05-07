import React, { useState } from 'react';
import Styled from "styled-components";
import { Frame, Page } from "framer";
import { motion } from "framer-motion";

import QuestionCount from "./QuestionCount";

const Container = Styled(motion.div)`
  height: 400px;
  padding: 30px 0;
  position: relative;
`;

const Card = Styled(Frame)`
  height: 375px;
  width: 300px;
  overflow: hidden;
`;

const QuestionNo = Styled.span`
  user-select: none;
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 36px;
  font-weight: 900;
  color: #48484810;
  z-index: 0;
`;

const Question = Styled.h1`
  position: absolute;
  color: #484848;
  width: 90%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  text-align: center;
  top: 30px;
  left: 5%;
  font-size: 1.4rem;
`;

const OptionContainer = Styled(motion.div)`
  position: absolute;
  height: 65%;
  width: 100%;
  top: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Option = Styled(motion.button)`
  outline: none;
  border: none;
  height: 50px;
  width: 90%;
  background: white;
  margin: 3px;
  border-radius: 5px;
  font-size: 1.3rem;
  font-family: Barlow;
  color: #484848cc;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.1);

  ${props => props.selected === true && `
    background: ${props.theme.color.yellow};;
  `};
`;

const QuestionCards = (props) => {
  return (
    <Container>
      <QuestionCount count={props.data.length} page={props.page} />
      <Page dragEnabled={props.quizmaster ? true : false} wheelEnabled={props.quizmaster ? true : false} currentPage={props.page} contentWidth="80vw" height={"400px"} paddingLeft="30" paddingRight="30" defaultEffect="coverflow" width="100vw" direction="horizontal" position="relative">
        {
          props.data.map((x, i) => {
            return (
              <Card width="85vw" background={"linear-gradient(209.19deg, rgba(253, 251, 251, 0.9) 5.08%, rgba(235, 237, 238, 0.9) 89.77%)"} radius="5px">
                <QuestionNo>Question {i + 1}</QuestionNo>
                <Question>{x.question}</Question>
                <OptionContainer>
                  {
                    x.answers.map((x) => {
                      if (props.quizmaster) {
                        return <Option
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}>
                        {x}
                      </Option>
                      }
                      if (x === props.selectedAnswer && props.page === i) {
                        return <Option onTap={() => props.handleAnswer(x)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        selected>
                        {x}
                      </Option>
                      } else {
                        return <Option onTap={() => props.handleAnswer(x)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}>
                        {x}
                      </Option>
                      }
                      
                    })
                  }
                </OptionContainer>
              </Card>
            )
          })
        }
      </Page>
    </Container>
  )
}

export default QuestionCards
