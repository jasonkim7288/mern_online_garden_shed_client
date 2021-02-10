import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import SignInOut from './SignInOut';

// Main page before signing in
const LandingPage = () => {
  const { state } = useGlobalState();
  const { isSignedIn } = state;
  let history = useHistory();

  const handleClickGuestLogin = () => {
    history.push('/sheds');
  };

  useEffect(() => {
    if (isSignedIn) {
      history.push('/sheds');
    }
  }, [isSignedIn, history]);

  return (
    <div className="landing-page-container">
      <div className="guest-login-item" >
        <button className="guest-button btn btn-gray" type="button" onClick={handleClickGuestLogin} >Guest</button>
      </div>
      <div className="google-login-item">
        <SignInOut tagType="button"/>
      </div>
    </div>
  )
}

export default LandingPage
