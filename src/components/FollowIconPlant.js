import React, { useState } from 'react';
import { useGlobalState } from '../config/globalState';
import api from '../config/api';
import { SET_USER } from '../config/types';

// this is the component that has a following plant icon
// when clicked, try to toggle the following status by accessing back end
const FollowIconPlant = ({ plantRecord, position }) => {
  const { state, dispatch } = useGlobalState();
  const { isSignedIn, currentUser } = state;
  const [isInProgress, setIsInProgress] = useState(false);

  const handleClickFollow = async event => {
    setIsInProgress(true);
    event.preventDefault();
    try {
      const res = await api.get(`/api/sheds/${plantRecord.ownedShed._id}/records/${event.target.dataset.value}/toggle-follow`);
      // because following information is in the user model, need to update current user information
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
    <div>
      {
        // following scenario works only when signed in
        isSignedIn && currentUser &&
          <div className={`plant-thumbnail-follow ${position === 'absolute' ? 'plant-thumbnail-follow-absolute' : ''}`}>
            {
              isInProgress ?
                <i className="fas fa-spinner spin"></i>
              :
                (
                  (currentUser.followingPlantRecords.find(followingPlantRecord => followingPlantRecord === plantRecord._id)) ?
                    <img className="add-hover"
                      onClick={handleClickFollow}
                      data-value={plantRecord._id}
                      src={`${process.env.PUBLIC_URL}/iconPlantFollowDark.png`}
                      alt="follow plant"
                    />
                  :
                    <img className="add-hover"
                      onClick={handleClickFollow}
                      data-value={plantRecord._id}
                      src={`${process.env.PUBLIC_URL}/iconPlantFollowLight.png`}
                      alt="follow plant"
                    />
                )
            }
          </div>
      }
    </div>
  );
};

export default FollowIconPlant;
