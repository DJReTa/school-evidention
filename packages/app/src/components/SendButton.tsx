import styled from "styled-components";

const SendButton = styled.button`
  background-image: linear-gradient(
    to right,
    #25aae1,
    #4481eb,
    #04befe,
    #3f86ed
  );
  border-radius: 50px;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  height: 55px;
  width: 100%;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
    background-position: 100% 0;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
`;

export default SendButton;
