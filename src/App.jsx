import { Provider } from "react-redux";
import store from "./app/store";
import Todo from "./components/Todo";
import AddComp from "./components/AddComp";
import { useState } from "react";

const App = () => {
  const [filtered, setFiltered] = useState();
  return (
    <Provider store={store}>
        <AddComp setFiltered={setFiltered}/>
        <Todo setFiltered={setFiltered} filtered={filtered}/>
    </Provider>
  );
};

export default App;
