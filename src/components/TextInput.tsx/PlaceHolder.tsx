import React from "react";
import styled from "styled-components";
import { NoteElement } from "../../App";

const Container = styled.div`
  color: gray;
  position: absolute;
  top: 0;
  left: 7px;
  pointer-events: none;
`;

const PlaceHolder: React.FC<{ note: NoteElement }> = ({ note }) => {
  return (
    <Container style={{ fontSize: note.type === "title" ? "25px" : "16px" }}>
      {note.type === "title" && "Title"}
      {note.type === "paragraph" && "Paragraph"}
      {note.type === "newNote" && "Type '/' for commands"}
      {note.type === "list" && "List title"}
    </Container>
  );
};

export default PlaceHolder;
