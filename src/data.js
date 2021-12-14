import {
  FormatListBulleted,
  FormatListNumbered,
  InsertPhoto,
  RadioButtonChecked,
  Remove,
  ShortText,
  TitleOutlined,
} from "@material-ui/icons";

export const optionsData = {
  listTypes: [
    {
      icon: <FormatListBulleted style={{ marginRight: "7px" }} />,
      type: "bullets",
      name: "Bulleted list",
    },
    {
      icon: <RadioButtonChecked style={{ marginRight: "7px" }} />,
      type: "checkbox",
      name: "Toggle list",
    },
    {
      icon: <FormatListNumbered style={{ marginRight: "7px" }} />,
      type: "numbered",
      name: "Numbered list",
    },
  ],
  types: [
    {
      icon: <TitleOutlined style={{ marginRight: "7px" }} />,
      name: "Title",
      type: "title",
    },
    {
      icon: <ShortText style={{ marginRight: "7px" }} />,
      name: "Paragraph",
      type: "paragraph",
    },
    {
      icon: <FormatListBulleted style={{ marginRight: "7px" }} />,
      name: "List",
      type: "list",
    },
    {
      icon: <Remove style={{ marginRight: "7px" }} />,
      name: "Divider",
      type: "divider",
    },
    {
      icon: <InsertPhoto style={{ marginRight: "7px" }} />,
      name: "Image",
      type: "image",
    },
  ],
};
