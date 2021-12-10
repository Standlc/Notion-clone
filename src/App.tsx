import { useEffect, useState } from "react";
import styled from "styled-components";
import EditorComponent from "./components/EditorComponent";
import { pagesFolder } from "../src/pagesData";
import { RangeProvider } from "./selectionRange";

export interface SelectionProps {
  selectionBoundings: {
    top: number | undefined;
    left: number | undefined;
  };
}
export interface List {
  content: string;
  id: string;
  checked?: boolean;
}
export interface NoteElement {
  type: string;
  content: string;
  listItems?: List[];
  listType?: string;
  img?: string;
  id: string;
}
export interface NotesFile {
  title: string;
  notes: NoteElement[];
  id: string;
}
const Container = styled.div`
  height: 100vh;
  background-color: rgb(14, 21, 27);
  display: flex;
  justify-content: space-between;
`;

const App = () => {
  const [notesFolder, setNotesFolder] = useState<NotesFile[]>(pagesFolder);

  const [currentNotes, setCurrentNotes] = useState<NotesFile>(pagesFolder[0]);

  useEffect(() => {
    const notesFolderCopy = notesFolder.slice();
    const currentNotesCopy = notesFolderCopy.find(
      (notesFile) => notesFile.id === currentNotes.id
    );
    if (currentNotesCopy) {
      currentNotesCopy.title = currentNotes.title;
      currentNotesCopy.notes = currentNotes.notes;
    }
    setNotesFolder(notesFolderCopy);
  }, [currentNotes]);

  return (
    <RangeProvider>
      <Container>
        {/* <SideBar
        notesFolder={notesFolder}
        setNotesFolder={setNotesFolder}
        currentNotes={currentNotes}
        setCurrentNotes={setCurrentNotes}
      /> */}
        <EditorComponent
          currentNotes={currentNotes}
          setCurrentNotes={setCurrentNotes}
        />
      </Container>
    </RangeProvider>
  );
};

export default App;
