import { useEffect } from "react";
import styled from "styled-components";
import { List } from "../App";

type Props = {
  item: List;
};

const Input = styled.div`
  white-space: pre;
  margin: 15px 0;
  color: white;
  border: none;
  /* width: 100px; */
  font-size: 20px;
  font-weight: 300;
  background-color: rgb(43, 43, 43);
  /* background-color: rgb(24, 24, 24); */
  &:focus {
    outline: none;
  }
`;

const IndividualEle: React.FC<Props> = ({ item }) => {
  const element = document.getElementById(item.id);

  useEffect(() => {
    if (element) {
      element.innerText = item.content + " ";
    }
  });

  return <Input id={item.id} spellCheck="false" contentEditable="true"></Input>;
};

export default IndividualEle;
