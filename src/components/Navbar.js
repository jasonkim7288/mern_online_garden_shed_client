import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import { SET_IS_MENU_ON } from '../config/types';
import SignInOut from './SignInOut';

// top navbar that has a main title and sign in/out or hamburger menu
const Navbar = () => {
  const { state, dispatch } = useGlobalState();
  const { isMenuOn } = state;
  const [ isWindowSmall, setIsWindowSmall] = useState(null);

  // only for tablet and mobile window size
  const handleClickMenuIcon = event => {
    event.preventDefault();
    dispatch({
      type: SET_IS_MENU_ON,
      payload: !isMenuOn
    })
  }

  // whenever window size is changed, need to decide whether the hamburger menu is displayed or not
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsWindowSmall(true);
      } else {
        setIsWindowSmall(false);
        dispatch({
          type: SET_IS_MENU_ON,
          payload: false
        })
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch])

  return (
    <nav>
      <div className="navbar-wrapper">
        <div className="navbar container">
          <div>
            <Link to="/sheds">Online Garden Shed</Link>
          </div>
          {
            (isWindowSmall !== null) && (
              isWindowSmall ?
                // for mobile and tablet window size
                <div className="mobile-menu-icon add-hover" onClick={handleClickMenuIcon} data-cy="mobile-menu">
                  <i className="fa fa-bars"></i>
                </div>
              :
                // for desktop window size
                <div>
                  <SignInOut tagType="paragraphWithIcon"/>
                </div>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
