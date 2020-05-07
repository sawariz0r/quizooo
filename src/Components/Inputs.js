import React from "react";
import Styled from "styled-components";
import { motion } from "framer";

export const Label = Styled.label` 
  position: relative;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 22px;
  color: #F3F3F3;
  text-shadow: 1px 3px 1px rgba(243, 243, 243, 0.3);

  @media screen and (max-width: 640px) {
    width: 90vw;
  }
  @media screen and (min-width: 641px) {
    width: 80%;
  }

`;

export const Input = Styled.input`
  font-family: Barlow;
  max-width: 90vw;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  font-size: 1.6rem;
  border-radius: 5px;
  margin-top: 10px;
  background: #f3f3f310; 
  outline: none;
  border: none;
  color: #f3f3f3;
  
  &::placeholder {
    color: #f3f3f380;
    padding-left: 0;
  }

  &:focus {
    border-bottom: 3px solid ${props => props.theme.primary};;
  }

  @media screen and (max-width: 640px) {
    width: 90vw;
  }
  @media screen and (min-width: 641px) {
    width: 100%;
  }
`;

const SelectInput = Styled.select`
  -webkit-appearance: none;
  appearance: none;
  color: #f3f3f3;
  font-family: Barlow;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin: 0.5rem 0;
  background: #f3f3f320;
  border: none;
  outline: none;
  height: 3rem;
  width: 95%;
`;
const Option = Styled.option``;
export const Select = ({ options, onChange, placeholder }) => (
  <SelectInput onChange={onChange} defaultValue="">
    <Option value="" disabled>{placeholder ? placeholder : "Pick one"}</Option>
    {options.length > 0 && options.map((x, i) => <Option key={x.title + i} value={x.id}>{x.title}</Option>)}
  </SelectInput>
)

const SliderContainer = Styled.div`
  width: 100%; 
  padding: 1rem 0 0 0;
`;
const SliderInput = Styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 2rem;
  background: #f3f3f320;
  outline: none;
  border: none;
  border-radius: 5px;
  -webkit-transition: .2s;
  transition: opacity .2s;

  &:hover &:active {
    background: #f3f3f380;
  }

  &::-webkit-slider-thumb {
    border-radius: 5px;
    -webkit-appearance: none;
    appearance: none;
    width: 2rem;
    height: 2rem;
  border: none;
    background: #f3f3f3;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    border-radius: 5px;
    width: 2rem;
    height: 2rem;
    background: #f3f3f3;
    cursor: pointer
  }
`;
export const Slider = (props) => (<SliderContainer><SliderInput {...props} /></SliderContainer>)

export const TextArea = Styled.textarea`
  white-space: pre-wrap;
  margin: 0.5rem 0;
  color: #f3f3f3;
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
  background: #f3f3f310; 
  padding: 1rem;
  min-height: 7rem;

  &::placeholder {
    color: #f3f3f380;
  }
`;

const ToggleBackground = Styled(motion.div)`
  background: #f3f3f320;
  width: 60px;
  height: 20px;
`;

const Toggle = () => {

  return (
    <ToggleBackground>

    </ToggleBackground>
  )
}