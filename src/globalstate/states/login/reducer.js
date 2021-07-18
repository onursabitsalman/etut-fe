import Const from './constant';

const initials = {
  login: {
    data: { isAuth: false },
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
        fetching: false,
        data: { isAuth: true, ...action.payload },
        error: null,
        success: true
      };

    case Const.LOGIN_REJECTED:
      return {
        fetching: false,
        data: { isAuth: false },
        error: action.payload,
        success: false
      };
    default:
      return state;
  }
};
