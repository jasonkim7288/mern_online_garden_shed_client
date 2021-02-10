import React from 'react';
import { useGlobalState } from '../config/globalState';
import { removeDomain } from '../utilities/strings';

// when the user click the picture of the user, they can see the profile info
const Profile = () => {
  const { state } = useGlobalState();
  const { isSignedIn, currentUser } = state;

  return (
    <>
      {
        // only allow the current user's profile
        isSignedIn && currentUser &&
          <>
            <h1 className="title">{`${removeDomain(currentUser.email)}'s Profile`}</h1>
            <div className="summary-wrapper">
              <img className="profile-image profile-image-large"
                src={currentUser.photo ? currentUser.photo : `${process.env.PUBLIC_URL}/favicon.ico`}
                alt="profile"
              />
              <div className="summary-text-wrapper">
                <p><strong>Name:</strong>&nbsp;{currentUser.displayName}</p>
                <p><strong>E-mail:</strong>&nbsp;{currentUser.email}</p>
            </div>
          </div>
          </>
      }
    </>
  );
};

export default Profile;
