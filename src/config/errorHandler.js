import { AUTH_SIGN_OUT, SET_USER } from "./types";

export const handleError = (err, history, isSignedIn, dispatch) => {
  const { response: res } = err;
  console.log('res:', res);
  if (res) {
    switch (res.status) {
      case 400:
        history.push('/error/400');
        break;
      case 401:
        // back end session is expired, so clear the login info in the front end
        if (isSignedIn) {
          // clear the user info in the global variable
          dispatch({
            type: SET_USER,
            payload: null
          });
          dispatch({ type: AUTH_SIGN_OUT });
              history.push('/');
        } else {
          history.push('/error/401');
        }
        break;
      case 404:
        history.push('/error/404');
        break;
      default:
        break;
    }
  }
};