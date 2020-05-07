import React, { useState } from "react";
import Styled from "styled-components";
import { navigate } from "@reach/router";
import { Frame as FramerFrame } from "framer";
import { motion } from "framer-motion";

export const Buttons = Styled.div`
width: 400px;
display: flex;
justify-content: center;

  @media screen and (max-width: 640px) {
    justify-content: space-between;
    width: 90vw;
  }
  @media screen and (min-width: 641px) {
    * {
      margin: 0 1rem;
    }
  }
`;

export const ButtonComponent = Styled(motion.button)`
font-size: 1.5rem;
color: #f3f3f3;
background: ${props => props.theme.color[props.color]};;
${props => props.margin && `margin: ${props.margin};`};
border: none;
max-width: 90vw;
padding: 0.5rem 1rem;
border: 5px solid #f3f3f320;
border-radius: 5px;
${props => props.fullWidth && `
  width: 85%;
  @media screen and (max-width: 640px) {
    width: 90vw;
  }
`}
`;

export const Button = (props) => (
  <ButtonComponent 
    {...props}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}>
      {props.children}
    </ButtonComponent>
);

const QOptionWrapper = Styled.div`
  display: flex;
  flex-direction: column;

  * {
    margin-bottom: 15px;
  }
`;

export const QOptions = ({ options, onChange }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (e, value) => {
    console.log("selected " + value);
    setSelected(value);
    onChange(value);
  }

  return (
    <QOptionWrapper>
      {
        options.map((x, i) => {
          return <Button key={x + i} onClick={(e) => handleSelect(e, x)} color={selected === x ? "secondary" : "transparent"}>{x}</Button>
        })
      }
    </QOptionWrapper>
  )
}

export const DeleteButton = Styled(Button)`
  position: absolute;
  top: ${props => props.top};;
  right: ${props => props.right};;
  background: ${props => props.theme.color.danger};;
  padding: 3px 8px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: #f3f3f3CC;
  `;

const Frame = Styled(FramerFrame)`
  box-sizing: border-box;
  position: relative;
  color: #315593;
  * {
    position: absolute;
  }
`;
const FrameTitle = Styled.span`
  top: 3px;
  left: 10px;
  font-size: 1.5rem;
  font-weight: 700;
`;
const FrameOwner = Styled.span`
  top: 30px;
  left: 10px;
`;  
const FramePlayerCount = Styled.span`
  bottom: 8px;
  left: 10px;
`; 
const FrameCode = Styled.span`
  bottom: 5px;
  right: 10px;
  font-size: 1.5rem;
  font-weight: 700;
`; 

export const GameListCard = (props) => (
  <Frame onTap={props.onTap} width={props.width + "px"} height="90px" left={((props.i * (props.width + 15)) + 20) + "px"} background={"linear-gradient(209.19deg, rgba(253, 251, 251, 0.9) 5.08%, rgba(235, 237, 238, 0.9) 89.77%)"} radius="5px">
    <FrameTitle>{props.roomname}</FrameTitle>
    <FrameOwner>{props.owner}</FrameOwner>
    <FramePlayerCount>{props.players}/{props.maxPlayers}</FramePlayerCount>
    <FrameCode>{props.roomcode}</FrameCode>
  </Frame>
)