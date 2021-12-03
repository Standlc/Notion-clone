import { AddCircle, MoreHoriz, Search } from "@material-ui/icons";
import styled from "styled-components";
import { NoteElement, NotesFile } from "../App";
import { v4 } from "uuid";

type Props = {
  notesFolder: NotesFile[];
  setNotesFolder: React.Dispatch<React.SetStateAction<NotesFile[]>>;
  currentNotes: NotesFile;
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>;
};

const Container = styled.div`
  height: calc(100% - 40px);
  padding: 20px;
  flex: 1;
  min-width: 250px;
  background-color: rgba(5, 10, 15);
`;
const SearchWrapper = styled.div`
  background-color: rgb(34, 43, 53);
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: white;
  padding: 7px 0px 7px 15px;
`;
const Input = styled.input`
  height: 100%;
  width: 100%;
  background-color: transparent;
  border: none;
  color: white;
  &:focus {
    outline: none;
  }
`;
const AddNote = styled.div`
  border-radius: 5px;
  color: rgb(14, 21, 27);
  cursor: pointer;
  margin: 5px 0;
  padding: 7px 15px;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: rgb(180, 180, 180);
  &:hover {
    background-color: rgb(220, 220, 220);
  }
  transition: background-color 100ms;
`;
const Options = styled.div`
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: background-color 100ms;
  &:hover {
    background-color: rgba(5, 10, 15);
  }
`;
const Note = styled.div<{
  currentNote: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin: 5px 0;
  padding: 7px 15px;
  background-color: ${(props) =>
    props.currentNote ? "rgb(14, 21, 27)" : "transparent"};
  &:hover {
    background-color: rgb(34, 43, 53);
  }
  &:hover ${Options} {
    visibility: visible;
  }
  transition: background-color 100ms;
`;

const SideBar: React.FC<Props> = ({
  notesFolder,
  setNotesFolder,
  currentNotes,
  setCurrentNotes,
}) => {
  const handleCurrentNotes = (noteFile: {
    title: string;
    notes: NoteElement[];
    id: string;
  }) => {
    setCurrentNotes(noteFile);
  };
  const handleAddPage = () => {
    const notesFolderCopy = notesFolder.slice();
    notesFolderCopy.push({
      title: "",
      id: v4(),
      notes: [
        {
          type: "newNote",
          content: "",
          id: v4(),
        },
      ],
    });
    setNotesFolder(notesFolderCopy);
  };
  const DeletePage = (Id: string) => {
    setCurrentNotes(notesFolder[0])
    setNotesFolder(notesFolder.filter((notesFile) => notesFile.id !== Id));
  };

  return (
    <Container>
      <SearchWrapper>
        <Search style={{ marginRight: "10px" }} />
        <Input />
      </SearchWrapper>
      {notesFolder.map((noteFile) => (
        <Note
          currentNote={noteFile.id === currentNotes.id}
          key={noteFile.id}
          onClick={() => handleCurrentNotes(noteFile)}
        >
          {noteFile.title
            ? noteFile.title
            : noteFile.notes[0]?.content
            ? noteFile.notes[0]?.content
            : "Untitled"}
          <Options onClick={() => DeletePage(noteFile.id)}>
            <MoreHoriz />
          </Options>
        </Note>
      ))}
      <AddNote onClick={handleAddPage}>
        <AddCircle style={{ marginRight: "10px" }} /> Add a page
      </AddNote>
    </Container>
  );
};

export default SideBar;
