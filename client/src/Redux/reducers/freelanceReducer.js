import {
  GET_FREELANCE,
  GET_FREELANCES_FAIL,
  GET_FREELANCES_LOAD,
  GET_FREELANCES_SUCCESS,
} from "../constants/actionTypes";

const initialState = {
  freelances: [],
  onefreelance: {},
  loadFreelances: false,
  errors: [],
  user: localStorage.getItem("currentUser"),
};

export const freelanceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FREELANCES_LOAD:
      return {
        ...state,
        loadFreelances: true,
      };
    case GET_FREELANCES_SUCCESS:
      return { ...state, loadFreelances: false, freelances: payload };
    case GET_FREELANCES_FAIL:
      return { ...state, loadFreelances: false, errors: payload };
    case GET_FREELANCE:
      return { ...state, onefreelance: payload };
    default:
      return state;
  }
};
