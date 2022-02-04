import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const Actions = ({ actions }) => {
    return (
      <div className="actions">
        {actions.map((action) => {
          return (
            <div className="action">
              <button
                onClick={() => modifyStatusAction(action)}
                className="checkbox"
                style={{ backgroundColor: action.status ? "rgb(99, 99, 99)" : "white" }}
              ></button>
              <p>{action.name}</p>
              <button onClick={() => handleWithEditButtonClick(action)}>
                <AiOutlineEdit size={20} color={"rgb(99, 99, 99)"}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteAction(action)}>
                <AiOutlineDelete size={20} color={"rgb(99, 99, 99)"}></AiOutlineDelete>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  async function handleWithNewButton() {
    console.log("fasfas");
    setInputVisility(!inputVisbility);
  }

  async function handleWithEditButtonClick(action) {
    setSelectedAction(action);
    setInputVisility(true);
  }

  async function getActions() {
    const response = await axios.get("http://localhost:3333/todos");
    setActions(response.data);
    console.log(response.data);
  }

  async function editAction() {
    await axios.put("http://localhost:3333/todos", {
      id: selectedAction.id,
      name: inputValue,
    });
    setSelectedAction();
    setInputVisility(false);
    getActions();
    setInputValue("");
  }

  async function deleteAction(action) {
    await axios.delete(
      `http://localhost:3333/todos/${action.id}`
    );
    getActions();
  }
  
  async function modifyStatusAction(action) {
    await axios.put("http://localhost:3333/todos", {
      id: action.id,
      status: !action.status,
    });
    getActions();
  }

  async function createAction() {
    await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getActions();
    setInputVisility(!inputVisbility);
    setInputValue("");
  }

  const [actions, setActions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedAction, setSelectedAction] = useState();

  useEffect(() => {
    getActions();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Agendamento de Consultas</h1>
        </div>
        <Actions actions={actions}></Actions>
        <input
          value={inputValue}
          style={{ display: inputVisbility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className="inputName"
        ></input>
        <button
          onClick={
            inputVisbility
              ? selectedAction
                ? editAction
                : createAction
              : handleWithNewButton
          }
          className="newTaskButton"
        >
          {inputVisbility ? "Ok" : "Novo Agendamento"}
        </button>
      </header>
    </div>
  );
}

export default App;
