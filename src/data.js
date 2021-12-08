import {
  FormatListBulleted,
  InsertPhoto,
  RadioButtonChecked,
  Remove,
  ShortText,
  TitleOutlined,
} from "@material-ui/icons";

export const optionsData = {
  listTypes: [
    {
      icon: <FormatListBulleted style={{ marginRight: "10px" }} />,
      type: "bullets",
      name: "Bullets",
    },
    {
      icon: <RadioButtonChecked style={{ marginRight: "10px" }} />,
      type: "checkbox",
      name: "Checkbox",
    },
  ],
  types: [
    {
      icon: <TitleOutlined style={{ marginRight: "10px" }} />,
      name: "Title",
      type: "title",
    },
    {
      icon: <ShortText style={{ marginRight: "10px" }} />,
      name: "Paragraph",
      type: "paragraph",
    },
    {
      icon: <FormatListBulleted style={{ marginRight: "10px" }} />,
      name: "List",
      type: "list",
    },
    {
      icon: <Remove style={{ marginRight: "10px" }} />,
      name: "Divider",
      type: "divider",
    },
    {
      icon: <InsertPhoto style={{ marginRight: "10px" }} />,
      name: "Image",
      type: "image",
    },
  ],
};
