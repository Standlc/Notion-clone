import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EditorComponent from "./components/EditorComponent";
import { pagesFolder } from "../src/pagesData";
import { RangeProvider } from "./selectionRange";
import { v4 } from "uuid";
import {
  MouseSelectionProvider,
} from "./mouseSelectionRect";

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
  img?: Blob | MediaSource | null;
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
  const [currentNotes, setCurrentNotes] = useState<NotesFile>({
    title: "",
    notes: [
      {
        type: "newNote",
        content: "",
        id: v4(),
      },
    ],
    id: v4(),
  });
  useEffect(() => {
    const stringifiedStoredPage = localStorage.getItem("currentPage");
    if (stringifiedStoredPage) {
      const storedPage = JSON.parse(stringifiedStoredPage);
      if (storedPage) setCurrentNotes(storedPage);
    }
  }, []);
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
    //LOCAL STORAGE
    localStorage.setItem("currentPage", JSON.stringify(currentNotes));
  }, [currentNotes, currentNotes.id]);

  return (
    <RangeProvider>
      <MouseSelectionProvider>
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
      </MouseSelectionProvider>
    </RangeProvider>
  );
};

export default App;
