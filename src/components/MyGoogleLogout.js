import React from 'react';
import {GoogleLogout} from 'react-google-login';
import { useHistory } from 'react-router-dom';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { AUTH_SIGN_OUT, SET_IS_MENU_ON, SET_USER } from '../config/types';

// This google logout component can be a button or a p tag depending on the usage.
// Log out button is on the the landing page which might not be visible because the homepage will be all garden sheds list
// once logged in
// Log out p tage is on the navbar for desktop window size and inside of the hamburger menu for mobile and tablet window size
const MyGoogleLogout = ({ tagType }) => {
  const { dispatch } = useGlobalState();
  let history = useHistory();

  const responseGoogleLogout = async () => {
    // close the menu first
    dispatch({
      type: SET_IS_MENU_ON,
      payload: false
    });

    // logout for back end
    try {
      await api.get('/api/auth/signout');

      // clear the user info in the global variable
      dispatch({
        type: SET_USER,
        payload: null
      });
      dispatch({ type: AUTH_SIGN_OUT });
      // go back to the landing page
      history.push('/');
    } catch (err) {
      console.log('err: ', err.response);
    }
  };

  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={renderProps => (
        (tagType === 'button') ?
          <button disabled={renderProps.disabled}
              className="button btn btn-gray google guest-button"
              onClick={event => {
                renderProps.onClick(event);
              }}
          >
            Sign out
          </button>
        :
          <p disabled={renderProps.disabled}
              onClick={(event) => {
                renderProps.onClick(event);
              }}
              className="add-hover"
              data-cy="sign-out"
          >
            Sign out
            {
              (tagType === 'paragraphWithIcon') &&
                <i className="fas fa-sign-out-alt ms-10"></i>
            }
          </p>
      )}
      onLogoutSuccess={responseGoogleLogout}
      onFailure={responseGoogleLogout}
    />
  );
};

export default MyGoogleLogout;
