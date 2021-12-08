import { v4 } from "uuid";

export const pagesFolder = [
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
  ]