import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOG_OUT,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  ADD_TODO_BEGIN,
  HANDLE_CHANGE,
  GET_TODO_SUCCESS,
  GET_TODO_BEGIN,
  DELETE_TODO_BEGIN,
  UPDATE_TODO_ERROR,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_BEGIN
} from "./actions";
import { initialState } from "./appContext";
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Pleas provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      login: true,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting...",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      login: true,
      showAlert: true,
      alertType: "success",
      alertText: "Login success! Redirecting...",
    };
  }
  if (action.type === LOG_OUT) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
   if (action.type === ADD_TODO_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ADD_TODO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      
      showAlert: true,
      alertType: "success",
      alertText: "Todo Created!",
    };
  }
  if (action.type === ADD_TODO_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === UPDATE_TODO_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_TODO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      
      showAlert: true,
      alertType: "success",
      alertText: "Todo Updated!",
    };
  }
  if (action.type === UPDATE_TODO_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if(action.type===GET_TODO_BEGIN){
    return { ...state,  showAlert: false }
  }
  if(action.type===GET_TODO_SUCCESS){
    return {
      ...state,
      todos:action.payload.todos
    }
  }
  if(action.type===DELETE_TODO_BEGIN){
    return {
      ...state,
      isLoading:true
    }
  }
  throw new Error(`no such action:${action.type}`);
};

export default reducer;
