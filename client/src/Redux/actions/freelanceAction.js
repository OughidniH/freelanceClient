import axios from "axios";

import {
  GET_FREELANCE,
  GET_FREELANCES_FAIL,
  GET_FREELANCES_LOAD,
  GET_FREELANCES_SUCCESS,
} from "../constants/actionTypes";

export const getFreelances = () => async (dispatch) => {
  dispatch({ type: GET_FREELANCES_LOAD });
  try {
    const response = await axios.get("http://localhost:5000/freelances/");

    dispatch({
      type: GET_FREELANCES_SUCCESS,
      payload: response.data.freelances,
    });
    // console.log(response);
  } catch (error) {
    dispatch({ type: GET_FREELANCES_FAIL, payload: error });
    console.log(error);
  }
};

export const getFreelance = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/freelances/getFreelance/${id}`
    );
    dispatch({ type: GET_FREELANCE, payload: response.data.onefreelance });
  } catch (error) {
    console.log(error);
  }
};

export const postFreelance = (freelance) => async (dispatch) => {
  try {
    await axios.post(
      "http://localhost:5000/freelances/postFreelance",
      freelance
    );
    console.log(freelance)
    dispatch(getFreelances());
  } catch (error) {
    console.log(error);
  }
};

export const patchFreelance = (id, freelance) => async (dispatch) => {
  try {
    await axios.patch(
      `http://localhost:5000/freelances/updateFreelance/${id}`,
      freelance
    );
    dispatch(getFreelances());
  } catch (error) {
    console.log(error);
  }
};
export const deleteFreelance = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/freelances/deleteFreelance/${id}`
    );
    dispatch(getFreelances());
  } catch (error) {
    console.log(error);
  }
};
