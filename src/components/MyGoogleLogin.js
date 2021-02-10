import React, { useCallback, useEffect, useState } from 'react';
import {GoogleLogin} from 'react-google-login';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { AUTH_SIGN_IN, SET_IS_MENU_ON, SET_USER } from '../config/types';
import ProgressFullScreen from './ProgressFullScreen';

// This google login component can be a button or a p tag depending on the usage
// log in button is on the landing page
// log in p tage is on the navbar for desktop window size and inside of the hamburger menu for mobile and tablet window size
const MyGoogleLogin = ({ tagType }) => {
  const { dispatch } = useGlobalState();
  const [isInProgress, setIsInProgress] = useState(false);
  let location = useLocation();
  let history = useHistory();

  // use useCallback to aviod warning in useEffect
  const responseGoogle = useCallback(
    async (data) => {
      try {
        // react-google-login module allows to get the access token from google
        const { accessToken } = data;
        console.log('data:', data);

        // send access token to the back end to verify access token,
        // store the user info and create an empty shed info to the database
        if (accessToken) {
          const res = await api.post('/api/auth/signin', {
            access_token: accessToken
          });

          if (res.data) {
            const resAcquiredUser = await api.get('/api/auth/userinfo');
            const acquiredUser = resAcquiredUser.data;
            console.log('acquiredUser:', acquiredUser);
            // all the user info can be already accessible by accessing 'data' variable,
            // but to make sure back end has the same validation and tha same user info
            // user information from the back end will be stored in the global variable
            dispatch({
              type: SET_USER,
              payload: acquiredUser
            })
            dispatch({ type: AUTH_SIGN_IN });
            if (location.pathname === '/') {
              history.push('/sheds');
            }
          }
        }
      } catch (err) {
        console.log('err: ', err.response);
      } finally {
        setIsInProgress(false);
        // always close the menu after loggin in
        dispatch({
          type: SET_IS_MENU_ON,
          payload: false
        });
      }
    },
    [dispatch, history, location.pathname]
  );

  // This is for the cypress test because cypress cannot control the google login window
  useEffect(() => {
    const access_token = new URLSearchParams(location.search).get('access_token');
    console.log('access_token', access_token);
    if (access_token) {
      responseGoogle({ accessToken: access_token });
    }
  }, [responseGoogle, location.search]);

  return (
    <>
      { isInProgress && <ProgressFullScreen /> }
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={renderProps => (
          (tagType === 'button') ? (
            <button disabled={renderProps.disabled}
                className="button btn btn-gray google guest-button"
                onClick={event => {
                  setIsInProgress(true);
                  renderProps.onClick(event);
                }}
            >
              <i className="fab fa-google"></i>Sign in with Google
            </button>
          )
          : (
            <p disabled={renderProps.disabled}
                onClick={(event) => {
                  setIsInProgress(true);
                  renderProps.onClick(event);
                }}
                className="add-hover"
            >
              <i className="fab fa-google"></i>Sign in with Google
            </p>
          )
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </>
  );
};

export default MyGoogleLogin;
