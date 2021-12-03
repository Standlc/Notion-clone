import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import EditorComponent from "./components/EditorComponent";
import SideBar from "./components/SideBar";

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
  const [notesFolder, setNotesFolder] = useState<NotesFile[]>([
    {
      title: "First Note",
      id: v4(),
      notes: [
        {
          type: "title",
          content: "Hello",
          id: v4(),
        },
        {
          type: "paragraph",
          content: "This is my first note.",
          id: v4(),
        },
        {
          type: "list",
          content: "Things to do :",
          listType: "bullets",
          listItems: [
            {
              content: "first thing",
              id: v4(),
            },
            {
              content: "second thing",
              id: v4(),
            },
          ],
          id: v4(),
        },
      ],
    },
    {
      title: "",
      id: v4(),
      notes: [
        {
          type: "title",
          content: "Second",
          id: v4(),
        },
        {
          type: "paragraph",
          content: "This is my second note.",
          id: v4(),
        },
        {
          type: "list",
          content: "Things not to do :",
          listType: "checkbox",
          listItems: [
            {
              content: "first thing",
              id: v4(),
            },
            {
              content: "second thing",
              id: v4(),
            },
          ],
          id: v4(),
        },
      ],
    },
    {
      title: "",
      id: v4(),
      notes: [
        {
          type: "paragraph",
          content: "This is my third note.",
          id: v4(),
        },
        {
          type: "paragraph",
          content: "Bla bla bla...",
          id: v4(),
        },
        {
          type: "list",
          content: "Things not to do :",
          listType: "checkbox",
          listItems: [
            {
              content: "first thing",
              id: v4(),
            },
            {
              content: "second thing",
              id: v4(),
            },
          ],
          id: v4(),
        },
        {
          type: "paragraph",
          content: "Bla bla bla...",
          id: v4(),
        },
      ],
    },
  ]);

  const [currentNotes, setCurrentNotes] = useState<NotesFile>({
    title: "iuhg",
    id: "jjih",
    notes: [
      {
        type: "title",
        content: "jh",
        id: v4(),
      },
      {
        type: "paragraph",
        content: "This is my first note.",
        id: v4(),
      },
      {
        type: "list",
        content: "Things to do :",
        listType: "bullets",
        listItems: [
          {
            content: "first thing",
            id: v4(),
          },
          {
            content: "second thing",
            id: v4(),
          },
        ],
        id: v4(),
      },
    ],
  });

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
    <Container>
      <SideBar
        notesFolder={notesFolder}
        setNotesFolder={setNotesFolder}
        currentNotes={currentNotes}
        setCurrentNotes={setCurrentNotes}
      />
      <EditorComponent
        currentNotes={currentNotes}
        setCurrentNotes={setCurrentNotes}
      />
    </Container>
  );
};

export default App;