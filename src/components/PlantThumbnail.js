import React from 'react';
import { Link } from 'react-router-dom';
import { getUniquePlantName, removeDomain } from '../utilities/strings';
import FollowIconPlant from './FollowIconPlant';

// card styled plant record info
// The owner name should be displayed when this component is called from following plants
// The owner name doesn't need to be displayed when this component is called from my garden shed or plants records in a shed
const PlantThumbnail = ({ plantRecord, withOwner }) => {
  const shedId = plantRecord.ownedShed._id;

  return (
    <Link to={`/sheds/${shedId}/records/${plantRecord._id}`}>
      <FollowIconPlant plantRecord={plantRecord} position="absolute"/>
      <div className="plant-thumbnail-wrapper">
        <img className="plant-thumbnail" src={plantRecord.recordPhoto} alt=""/>
        {
          withOwner &&
            <p className="garden-shed-owner">{removeDomain(plantRecord.ownedShed.owner.email)}</p>
        }
        <p className="plant-thumbnail-name">{getUniquePlantName(plantRecord)}</p>
      </div>
    </Link>
  );
};

export default PlantThumbnail;
