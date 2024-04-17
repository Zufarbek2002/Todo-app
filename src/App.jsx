import { Provider } from "react-redux";
import store from "./app/store";
import Todo from "./components/Todo";
import AddComp from "./components/AddComp";

const App = () => {
  return (
    <Provider store={store}>
        <AddComp />
        <Todo />
    </Provider>
  );
};

export default App;
