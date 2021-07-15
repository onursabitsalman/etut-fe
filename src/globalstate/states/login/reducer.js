import { LOGIN_FULFILLED, LOGIN_REJECTED, LOGIN_PENDING } from './action';

const initialState = {
  data: {
    isAuth: false
  },
  success: false,
  fetching: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_PENDING:
      return {
        ...state,
        fetching: true
      };

    case LOGIN_FULFILLED:
      return {
        fetching: false,
        data: {
          isAuth: true,
          ...payload
        },
        error: null,
        success: true
      };

    case LOGIN_REJECTED:
      return {
        fetching: false,
        data: {
          isAuth: false
        },
        error: payload,
        success: false
      };
    default:
      return state;
  }
};
