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
      icon: <FormatListBulleted style={{ marginRight: "7px" }} />,
      type: "bullets",
      name: "Bullets",
    },
    {
      icon: <RadioButtonChecked style={{ marginRight: "7px" }} />,
      type: "checkbox",
      name: "Checkbox",
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
