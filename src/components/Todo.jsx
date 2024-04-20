/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Box, Button, Card, Checkbox, Container } from "@mui/material";
import { useTodoStore } from "../store/todoStore";

const Todo = ({ filtered, setFiltered }) => {
  const { loading, error, todo, fetchTodo, deleteTodo, editTodo } =
    useTodoStore();

  const handleChange = async (e, id) => {
    const bool = e.target.checked;
    editTodo(id, bool);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this task")) {
      deleteTodo(id);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);
  useEffect(() => {
    setFiltered(todo);
  }, [todo]);
  return (
    <Container>
      <Box mt={4}>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {todo.length > 0 &&
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
                variant="outlined"
                color="error"
                onClick={() => handleDelete(data.id)}
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
