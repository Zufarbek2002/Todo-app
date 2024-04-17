import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../app/todo/todoSlice";
import { Box, Button, Card, Checkbox, Container } from "@mui/material";

const Todo = () => {
  const [checked, setChecked] = useState();
  const { loading, data, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  console.log(checked)
  return (
    <Container>
      <Box mt={4}>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {data.length > 0 &&
          data.map((data) => (
            <Card
              key={data.id}
              sx={{
                mb: 2,
                p: 2,
                py: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{display:"flex", gap:1, alignItems:"center"}}>
                <Checkbox checked={data.completed} onChange={handleChange} />
                <h2 style={{textDecorationLine: data.completed ? "line-through" : "none"}}>{data.title}</h2>
              {/* <p>{data.completed ? "true" : "false"}</p> */}
              </Box>
              <Button>Delete</Button>
            </Card>
          ))}
      </Box>
    </Container>
  );
};

export default Todo;
