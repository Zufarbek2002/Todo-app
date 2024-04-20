import { useState } from "react";
import Todo from "./components/Todo";
import AddComp from "./components/AddComp";

const App = () => {
  const [filtered, setFiltered] = useState();
  return (
    <>
      <AddComp setFiltered={setFiltered} />
      <Todo setFiltered={setFiltered} filtered={filtered} />
    </>
  );
};

export default App;
