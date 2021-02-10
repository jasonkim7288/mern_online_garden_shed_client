import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import api from '../config/api';
import { SET_USER } from '../config/types';
import { getUniquePlantName, removeDomain } from '../utilities/strings';
import { useGlobalState } from '../config/globalState';

// display single garden shed
const GardenShedThumbnail = ({ shed }) => {
  const { state, dispatch } = useGlobalState();
  const { isSignedIn, currentUser } = state;
  const [isInProgress, setIsInProgress] = useState(false);

  // if the user click the follow icon, store the following info to the backend
  // it also take some time, so progress animation is needed
  const handleClickFollow = async event => {
    setIsInProgress(true);
    event.preventDefault();
    try {
      const res = await api.get(`/api/sheds/${event.target.dataset.value}/toggle-follow`);
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    } catch (error) {
      console.log('error.response: ', error.response);
    } finally {
      setIsInProgress(false);
    }
  }

  return (
    <Link to={`/sheds/${shed._id}`} className="garden-shed-wrapper">
      <div className="garden-shed-image-wrapper">
        {/* the recent plant record photo */}
        <img className="garden-shed-image"
          src={shed.plantRecords[0].recordPhoto}
          alt="Garden shed"
        />
        {/* frame icon */}
        <img className="garden-shed-image-frame"
          src={`${process.env.PUBLIC_URL}/gardenShedFrame.png`}
          alt="Garden shed frame"
        />
        {
          // display following icon only if signed in
          isSignedIn && currentUser &&
            <div className="garden-shed-follow">
              {
                isInProgress ?
                  <i className="fas fa-spinner spin"></i>
                :
                  (
                    (currentUser.followingSheds.find(followingShed => followingShed === shed._id)) ?
                      <img
                        onClick={handleClickFollow}
                        data-value={shed._id}
                        src={`${process.env.PUBLIC_URL}/iconShedFollowDark.png`}
                        alt="follow shed"
                      />
                    :
                      <img
                        onClick={handleClickFollow}
                        data-value={shed._id}
                        src={`${process.env.PUBLIC_URL}/iconShedFollowLight.png`}
                        alt="follow shed"
                      />
                  )
              }
            </div>
        }
      </div>
      <div>
        {/* owner */}
        <p className="garden-shed-owner">{removeDomain(shed.owner.email)}</p>
        {/* plants records names */}
        {
          shed.plantRecords.length > 0 && (
            <p className="garden-shed-plants-list">
              {shed.plantRecords.map(plantRecord => getUniquePlantName(plantRecord)).join(', ')}
            </p>
          )
        }
      </div>
    </Link>
  );
};

export default GardenShedThumbnail;
