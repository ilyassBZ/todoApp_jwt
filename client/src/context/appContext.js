import { useState, useReducer, useContext } from "react";
import React from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOG_OUT,
  ADD_TODO_BEGIN,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  HANDLE_CHANGE,
  GET_TODO_BEGIN,
  GET_TODO_SUCCESS,
  DELETE_TODO_BEGIN,
  UPDATE_TODO_BEGIN,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
} from "./actions";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
export const initialState = {
  user: null,
  token: null,
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  
  todos: [],
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const registerUser = async (currentUser) => {
    dispatch({
      type: REGISTER_USER_BEGIN,
    });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        currentUser
      );
      const { user, token } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };
  const loginUser = async (currentUser) => {
    dispatch({
      type: LOGIN_USER_BEGIN,
    });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        currentUser
      );
      const { user, token } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const logOutUser = () => {
    dispatch({ type: LOG_OUT });
    removeUserFromLocalStorage();
  };
  const addTodo = async (todo) => {
    dispatch({
      type: ADD_TODO_BEGIN,
    });

    try {
      await axios.post(
        "http://localhost:5000/api/v1/todo/",
        { todo },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      dispatch({
        type: ADD_TODO_SUCCESS,
        
      });
      getTodo()
    } catch (error) {
      dispatch({
        type: ADD_TODO_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const getTodo = async () => {
    dispatch({ type: GET_TODO_BEGIN });
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/todo/", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      const { todos } = data;
      dispatch({
        type: GET_TODO_SUCCESS,
        payload: { todos },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTodo = async (id) => {
    dispatch({ type: DELETE_TODO_BEGIN });
    try {
      await axios.delete(`http://localhost:5000/api/v1/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      getTodo();
    } catch (err) {}
  };
  const updateTodo = async (isUpdating,todo) => {
    dispatch({
      type: UPDATE_TODO_BEGIN,
    });

    try {
      await axios.patch(
        "http://localhost:5000/api/v1/todo/",
        { _id:isUpdating,todo },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      dispatch({
        type: UPDATE_TODO_SUCCESS,
        
      });
      getTodo()
    } catch (error) {
      dispatch({
        type: UPDATE_TODO_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logOutUser,
        addTodo,
        handleChange,
        getTodo,
        deleteTodo,
        updateTodo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
