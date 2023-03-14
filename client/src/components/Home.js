import React, { useEffect, useState } from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { useAppContext } from "../context/appContext";
import { Input } from "@mui/material";
import Alert from "../components/Alert";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [isUpdating, setUpdating] = useState("");
  const {
    showAlert,
    displayAlert,
    addTodo,
    handleChange,
    getTodo,
    todos,
    deleteTodo,
    updateTodo,
  } = useAppContext();
  useEffect(() => {
    getTodo();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdating === "") {
      if (!todo) {
        displayAlert();
        return;
      }
      addTodo(todo);
      setTodo("");
    } else {
      updateTodo(isUpdating, todo);
      setTodo("");
      setUpdating("");
    }
  };

  /* const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  }; 
  */
  const UpdateTodo = (_id, todo) => {
    setUpdating(_id);
    setTodo(todo);
  };
  return (
    <div className='home'>
      <Container className='home-container'>
        <Row>
          <Col>
            <h3 className='home-title'>TODO LIST</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert />
            <InputGroup className='input-add mb-3'>
              <form>
                <Input
                  className='inputAdd'
                  placeholder='add'
                  name='todo'
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  aria-label='todolist'
                />
                <Button className='btn-add' onClick={handleSubmit}>
                  {isUpdating ? "Update" : "Add"}
                </Button>
              </form>
            </InputGroup>
          </Col>
        </Row>
        {todos.map((todo) => {
          return (
            <Row>
              <Col>
                <h2>{todo.todo}</h2>
              </Col>
              <Col className='list-btn'>
                <Button
                  size='sm'
                  className='btn-add'
                  onClick={() => UpdateTodo(todo._id, todo.todo)}
                >
                  <EditOutlinedIcon />
                </Button>

                <Button
                  size='sm'
                  className='btn-add'
                  onClick={() => deleteTodo(todo._id)}
                >
                  <DeleteOutlineOutlinedIcon />{" "}
                </Button>
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );
};

export default Home;
