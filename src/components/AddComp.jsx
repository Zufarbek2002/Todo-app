import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUser } from "../app/todo/todoSlice";

const AddComp = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState({
    title: "",
    completed: false,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    setOpen(false);
    await axios.post("http://localhost:3000/data", tasks);
    setTasks({
      title: "",
      completed: false,
    });
    dispatch(fetchUser());
  };

  return (
    <Container>
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "40px",
            mt: 5,
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Searched"
            variant="outlined"
            color="success"
          />
          <Button
            sx={{ paddingX: 5 }}
            variant="outlined"
            color="success"
            onClick={handleClickOpen}
          >
            Add
          </Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Add tasks"}</DialogTitle>
          <Box>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                id="outlined-basic"
                label="Task title"
                variant="outlined"
                color="primary"
                onChange={(e) => {
                  setTasks({
                    ...tasks,
                    title: e.target.value,
                  });
                }}
              />
              <InputLabel id="demo-simple-select-label">Completed:</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Complete"
                defaultValue={false}
                onChange={(e) => {
                  setTasks({
                    ...tasks,
                    completed: e.target.value,
                  });
                }}
              >
                <MenuItem value={true}>Completed</MenuItem>
                <MenuItem value={false}>Uncompleted</MenuItem>
              </Select>
            </DialogContent>
          </Box>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleAdd} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Container>
  );
};
export default AddComp;
