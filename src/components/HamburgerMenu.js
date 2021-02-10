import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import { SET_IS_MENU_ON } from '../config/types';
import SignInOut from './SignInOut';

// it only appears when the window size is less than 1200px which is controlled by NavBar component
const HamburgerMenu = () => {
  const { state, dispatch } = useGlobalState();
  const { currentUser, isMenuOn } = state;
  let history = useHistory();

  // most of the menu items have url to redirect and title except for google sign in and out
  const handleClickRedirect = (event) => {
    console.log('event.target.dataset:', event.target.dataset.path);
    console.log('currentUser:', currentUser);
    const { path } = event.target.dataset;
    if (path) {
      // after redirect, close the menu
      dispatch({
        type: SET_IS_MENU_ON,
        payload: false
      });
      history.push(path);
    }
  };

  return (
    <>
      {
        isMenuOn &&
        <div id="mobile-menu-list">
          {
            currentUser ?
              <>
                <p onClick={handleClickRedirect} data-path={`/user/profile`} className="mobile-menu-profile">
                  <img src={currentUser.photo} alt="current user" className="profile-image profile-image-position"/>
                  {currentUser.displayName}
                </p>

                <p onClick={handleClickRedirect} data-path={`/user/my-shed`}>My Garden Shed</p>
                <p onClick={handleClickRedirect} data-path={`/sheds/${currentUser.shed}/records/new`} data-cy="mobile-menu-create-record">Create Record</p>
                <hr />
                <p onClick={handleClickRedirect} data-path={`/user/following-sheds`}>Following - Garden Sheds</p>
                <p onClick={handleClickRedirect} data-path={`/user/following-plants`}>Following - Plants</p>
                <hr />
                <p onClick={handleClickRedirect} data-path={`/user-guide`}>User Guide</p>
                <p onClick={handleClickRedirect} data-path={`/mission-statement`}>Mission Statement</p>
                <hr />
                <SignInOut tagType="paragraphWithoutIcon"/>
              </>
              :
              <>
                <SignInOut tagType="paragraphWithoutIcon"/>
                <hr />
                <p onClick={handleClickRedirect} data-path={`/mission-statement`}>Mission Statement</p>
              </>
          }
        </div>
      }
    </>
  );
};

export default HamburgerMenu;
