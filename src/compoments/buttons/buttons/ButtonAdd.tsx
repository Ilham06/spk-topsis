import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type ButtonType = {
  onClick: () => void;
  title: string;
};

const ButtonAdd = (props: ButtonType) => {
  return (
    <Button
      onClick={props.onClick}
      variant="contained"
      size="medium"
      style={{
        alignSelf: "right",
        alignContent: "right",
        textTransform: "capitalize",
        borderRadius: "8px",
        boxShadow: "none",
        fontFamily: "Public Sans",
      }}
    >
      <AddIcon fontSize="small" style={{ marginRight: 3 }} /> {props.title}
    </Button>
  );
};

export default ButtonAdd;
