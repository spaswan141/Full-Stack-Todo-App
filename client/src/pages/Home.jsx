import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { notification } from "antd"

//import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";
import axios from "axios";
import ToDo from "../components/Todo.jsx";


const Home = () => {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const token=JSON.parse(localStorage.getItem("token"))
  const getAllToDo = async () => {
    axios
      .get(`http://localhost:8080/todo/todos`, {
        headers: {
          Authorization:
         token,
        },
      })
      .then(({ data }) => {
        setToDo(data.data);
      });
  };
  useEffect(() => {
    getAllToDo();
  }, [ToDo]);

  const updateToDo = (id, text) => {
    const payload = {
      text: text,
    };
    axios
      .put(`http://localhost:8080/todo/update/${id}`, payload, {
        headers: {
          "content-type": "application/json",
          Authorization:
         token,
        },
      })
      .then(({ data }) => {
        setToDo(data.data);
        setText("")
        getAllToDo();
        setIsUpdating(false)
        notification["success"]({
          message: "Todo updated successfully",
          duration: 2,
        })
        
      });
  };
  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };
  const deleteToDo = (id) => {
    axios
      .delete(`http://localhost:8080/todo/delete/${id}`,{
        headers: {
          "content-type": "application/json",
          Authorization:
         token,
        },
      })
      notification["success"]({
        message: "Todo deleted successfully",
        duration: 2,
      })
      getAllToDo();

  };
  const addToDo = (text) => {
    const payload = {
      text: text,
    };
    axios
      .post(`http://localhost:8080/todo/create-todo`, payload, {
        headers: {
          "content-type": "application/json",
          Authorization:
         token,
        },
      })
      .then(({ data }) => {
        setToDo(data.data);
        notification["success"]({
          message: "Todo added successfully",
          duration: 2,
        })
        getAllToDo()

      });
  };
  return (
    <div>
      <Navbar />
      <div className="container">

        <div style={{marginTop:'25%'}} className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(toDoId,text)
                : () => addToDo(text)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>

        <div className="list">
          {toDo &&
            toDo.length > 0 &&
            toDo.map((item) => (
              <ToDo
                key={item._id}
                text={item.text}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => deleteToDo(item._id, setToDo)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
