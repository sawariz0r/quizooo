import React from 'react';
import Styled from "styled-components";
import { motion } from "framer-motion";

const Component = Styled(motion.div)`
  height: 15px;
  width: 80vw;
  margin-left: 10vw;
  display: flex;
`;

const QBox = Styled(motion.div)`
  height: 10px;
  width: 10px;
  margin: 0 3px;
  background: #f3f3f320;

  ${props => props.white && `
  background: #f3f3f3;
  `};;

  ${props => props.current && `
    background: #f3f3f3;
    transform: translateY(-3px);

    &::before {
      content: "${props.count + 1}";
      font-family: Barlow;
      position: absolute;
      top: -1.4rem;
      left: 1px;
      ${props.count > 8 && `
      left: -4px;
      `}
    }
  `};;
`;

const QuestionCount = (props) => {
  const boxes = Array(props.count).fill("");
  return (
    <Component>
      {
        props.count ? boxes.map((x, i) => {
          if (i < props.page) {
            return <QBox white />
          } else if (i === props.page) {
            return <QBox current count={i} />
          } else {
            return <QBox />
          }
        })
        : 
        null
      }
    </Component>
  )
}

export default QuestionCount
