import Const from './constant';

const initials = {
  login: {
    data: {},
    success: false,
    fetching: false,
    error: null
  }
};

export default (state = initials.login, action) => {
  switch (action.type) {
    case Const.LOGIN_PENDING:
      return {
        ...state,
        fetching: true
      };

    case Const.LOGIN_FULFILLED:
      return {
        data: action.payload,
        success: true,
        fetching: false,
        error: null
      };

    case Const.LOGIN_REJECTED:
      return {
        data: {},
        success: false,
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
