import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Container, MenuItem, Select, TextField } from "@mui/material";

const AddComp = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <DialogContent sx={{display:"flex", flexDirection:'column', gap: 2}}>
              <TextField
                id="outlined-basic"
                label="Task title"
                variant="outlined"
                color="primary"
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Complete"
                // onChange={handleChange}
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
            <Button onClick={handleClose} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Container>
  );
};
export default AddComp;
