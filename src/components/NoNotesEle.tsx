import styled from "styled-components";

interface Props {
    
}

const Container = styled.div``;
const NewNote = styled.input`
  padding: 0 10px;
  margin: 1px 0;
  border-radius: 5px;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: 300;
  background-color: transparent;
  width: 100%;
  resize: none;
  transition: background-color 100ms;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgb(5, 10, 15);
  }
`;

const NoNotesEle = () => {
  return (
    <Container>
      <NewNote />
    </Container>
  );
};

export default NoNotesEle;
