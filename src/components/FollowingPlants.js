import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { handleError } from '../config/errorHandler';
import PlantThumbnail from './PlantThumbnail';

// list up all the plants records that the current user follows
const FollowingPlants = () => {
  const [connectedUser, setConnectedUser] = useState(null);
  const { state, dispatch } = useGlobalState();
  const { isSignedIn } = state;
  let history = useHistory();

  useEffect(() => {
    // get the current user information include all the follwoing plants records details
    // which doesn't have in the currentUser, the global state.
    const getCurrentUser = async () => {
      try {
        const res = await api.get('/api/sheds/following-plant-records');
        setConnectedUser(res.data);
      } catch (error) {
        console.log('error.response: ', error.response);
        handleError(error, history, isSignedIn, dispatch);
      }
    };
    getCurrentUser();
  }, [history, isSignedIn, dispatch]);

  return (
    <>
      {
        // display only if signed in
        isSignedIn && connectedUser &&
          <>
            <h1 className="title">Following Plants</h1>
            <div className="thumbnails-container">
              {
                connectedUser.followingPlantRecords.map(plantRecord =>
                  <PlantThumbnail key={plantRecord._id} plantRecord={plantRecord} withOwner={true}/>
                )
              }
            </div>
            {/* just in case there is no following plants records */}
            {
              connectedUser.followingPlantRecords.length <= 0 &&
              <p className="no-data-message">
                <strong>No following Plants</strong><br/>
                You can click
                <img className="no-data-message-icon" src={`${process.env.PUBLIC_URL}/iconPlantFollowLight.png`} alt="follow plant"/><br/>
                to follow plants records you like
              </p>
            }
          </>
      }
    </>
  );
};

export default FollowingPlants;