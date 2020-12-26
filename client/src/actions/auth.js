import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types.js";
import setAuthToken from "../utils/setAuthToken";

//loadUser
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/api/v1/auth/me");
console.log(res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// register user
export const register = ({ name, email, password }) => async (dispatch) => {
 

  const body = JSON.stringify({ name, email, password });
  console.log(body);
  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      body,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};


// login user
export const login = ({ email, password }) => async (dispatch) => {

  const body = JSON.stringify({ email, password });
  console.log(body);
  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      body,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
   
  } catch (err) {
    console.log(err);

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//LOGOUT /clear profile
export const logout = ()=> dispatch =>{
  dispatch({type:LOGOUT})
}