import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import MyGoogleLogout from './MyGoogleLogout';
import MyGoogleLogin from './MyGoogleLogin';

// SignInOut has google login and logout functions and uses on the landing page, the navbar and the hamburger menu
const SignInOut = ({ tagType }) => {
  const { state } = useGlobalState();
  const { isSignedIn, currentUser } = state;
  let history = useHistory();

  const handleClickProfile = () => {
    history.push('/user/profile');
  }

  return (
    <>
      {
        (isSignedIn && currentUser) ?
          (
            tagType === 'paragraphWithoutIcon' ?
                <MyGoogleLogout tagType={tagType} />
              :
                <div className="profile-wrapper">
                  <img className="profile-image add-hover"
                    src={currentUser.photo ? currentUser.photo : `${process.env.PUBLIC_URL}/favicon.ico`}
                    onClick={handleClickProfile}
                    alt="profile"
                  />
                  <MyGoogleLogout tagType={tagType} />
                </div>
          )
        :
          (
            tagType === 'paragraphWithoutIcon' ?
              <MyGoogleLogin tagType={tagType} />
            :
              <div className="profile-wrapper">
                <MyGoogleLogin tagType={tagType} />
              </div>
          )
      }
    </>
  );
}

export default SignInOut;

