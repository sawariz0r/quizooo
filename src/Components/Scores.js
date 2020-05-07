import React from 'react';
import Styled from "styled-components";
import { motion } from "framer-motion";

const Component = Styled(motion.div)``;

const Piedestal = Styled(motion.div)`
  display: flex;
  padding: 5vw 10vw;
  justify-content: space-evenly;
`;
const Medalitem = Styled(motion.div)`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  ${props => props.place === 1 && `
    order: 2;
    width: 40%;
    &::before {
      content: "${props.place}";
      position: absolute;
      display: flex;
      font-weight: 900;
      font-size: 1.4rem;
      justify-content: center;
      align-items: center;
      left: 50%;
      transform: translateX(-50%);
      bottom: -1rem;
      background-color: #fbb034;
      background-image: linear-gradient(315deg, #fbb034 0%, #ffdd00 74%);
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  `};
  ${props => props.place === 2 && `
    order: 1;
    width: 20%;
    &::before {
      content: "${props.place}";
      position: absolute;
      display: flex;
      font-weight: 900;
      font-size: 1.2rem;
      justify-content: center;
      align-items: center;
      left: 50%;
      transform: translateX(-50%);
      bottom: -0.2rem;
      background-color: #b8c6db;
      background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  `};
  ${props => props.place === 3 && `
    order: 3;
    width: 20%;
    &::before {
      content: "${props.place}";
      position: absolute;
      display: flex;
      font-weight: 900;
      font-size: 1.2rem;
      justify-content: center;
      align-items: center;
      left: 50%;
      transform: translateX(-50%);
      bottom: -0.2rem;
      background-color: #a44200;
      background-image: linear-gradient(315deg, #a44200 0%, #f2c17d 74%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  `}; 
`;

const MedalProfilePic = Styled(motion.div)`
  border-radius: 50%;
  background-color: #f8ceec;
  background-image: linear-gradient(315deg, #f8ceec 0%, #a88beb 74%);
  box-shadow: 0 5px 10px rgba(59, 43, 91, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.place === 1 && `
    width: 100px;
    height: 100px;
    font-size: 3rem;
  `};
  ${props => props.place === 2 && `
    width: 70px;
    height: 70px;
    font-size: 2rem;
  `};
  ${props => props.place === 3 && `
    width: 70px;
    height: 70px;
    font-size: 2rem;
  `};
`;

const MedalName = Styled(motion.div)`
  font-weight: 700;
  ${props => props.place === 1 && `
    font-size: 2rem;
  `};
`;
const MedalPoints = Styled(motion.div)`
  margin: 0 0 5px 0; 
  width: 20vw;
  line-break: no-break;
`;


const Scorelist = Styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;
  padding: 5vw;
  box-sizing: border-box;
`;
const Scoreitem = Styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 7px 0;
`;
const ScorePoints = Styled(motion.div)`
  flex: 8;
`;
const Name = Styled(motion.span)`
  font-weight: 500;
  font-size: 1.2rem;
`;
const ScorePlace = Styled(motion.div)`
  flex: 1;
  text-align: center;
`;
const ProfilePic = Styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  margin: 0 15px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8ceec;
  background-image: linear-gradient(315deg, #f8ceec 0%, #a88beb 74%);
  box-shadow: 0 5px 10px rgba(59, 43, 91, 0.2);
`;

const Scores = (props) => {
  if (props.scores === null) return <div></div>;
  const sortedScores = props.scores.sort((a, b) => b.score - a.score);
  const medals = sortedScores.filter((x, i) => i <= 2);
  const placelist = sortedScores.filter((x, i) => i > 2);
  return (
    <Component>
      <Piedestal>
        {
          medals.map((x, i) => {
            const place = i + 1;
            return (
              <Medalitem key={x+i} place={place}>
                <MedalName place={place}>{x.name}</MedalName>
                <MedalPoints>{x.score} points</MedalPoints>
                <MedalProfilePic place={place}>{x.name[0]}</MedalProfilePic>
              </Medalitem>
            )
          })
        }
      </Piedestal>
      <Scorelist>
        {
          placelist.map((x, i) => {
            const place = i + 4;
            return (
              <Scoreitem key={x+i}>
                <ScorePlace>{place}</ScorePlace>
                <ProfilePic>{x.name[0]}</ProfilePic>
                <ScorePoints><Name>{x.name}</Name> <br />
                  {x.score} points</ScorePoints>
              </Scoreitem>
            )
          })
        }
      </Scorelist>
    </Component>
  )
}

export default Scores
