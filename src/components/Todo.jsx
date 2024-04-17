/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../app/todo/todoSlice";
import { Box, Button, Card, Checkbox, Container } from "@mui/material";
import axios from "axios";

const Todo = ({ filtered, setFiltered }) => {
  const { loading, data, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const handleChange = async (e, id) => {
    const res = data.filter((data) => data.id == id);
    await axios.put(`http://localhost:3000/data/${id}`, {
      title: res[0].title,
      completed: e.target.checked,
    });
    dispatch(fetchUser());
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/data/${id}`);
    dispatch(fetchUser());
  };
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  useEffect(() => {
    setFiltered(data);
  }, [data]);
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
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Checkbox
                  defaultChecked={data.completed}
                  onChange={(e) => handleChange(e, data.id)}
                />
                <h2
                  style={{
                    textDecorationLine: data.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {data.id}. {data.title}
                </h2>
              </Box>
              <Button
                onClick={() => handleDelete(data.id)}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </Card>
          ))}
      </Box>
    </Container>
  );
};

export default Todo;
