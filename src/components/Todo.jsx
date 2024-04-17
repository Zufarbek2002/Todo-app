import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../app/todo/todoSlice";
import { Box, Button, Card, Checkbox, Container } from "@mui/material";
import axios from "axios";

const Todo = () => {
  const [checked, setChecked] = useState();
  const { loading, data, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState(data);
  const handleChange = (event, id) => {
    setChecked(event.target.checked);
    axios.post(`http://localhost:3000/data/${id}`, {completed: event.target.checked})
  };
  const handleDelete = (id)=>{
    setFiltered(filtered.filter((student) => student.id !== id));
    axios.delete(`http://localhost:3000/data/${id}`)
  }
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  useEffect(()=>{
    setFiltered(data)
  },[data])
  // console.log(checked)
  return (
    <Container>
      <Box mt={4}>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {data.length > 0 &&
          filtered.map((data) => (
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
                <Checkbox checked={data.completed} onChange={()=>handleChange(data.id)} />
                <h2 style={{textDecorationLine: data.completed ? "line-through" : "none"}}>{data.title}</h2>
              {/* <p>{data.completed ? "true" : "false"}</p> */}
              </Box>
              <Button onClick={()=>handleDelete(data.id)}>Delete</Button>
            </Card>
          ))}
      </Box>
    </Container>
  );
};

export default Todo;
