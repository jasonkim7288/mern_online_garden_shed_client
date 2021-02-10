import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom';
import api from '../config/api';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PlantLog from './PlantLog';
import { getUniquePlantName, removeDomain } from '../utilities/strings';
import PlantRecordSummary from './PlantRecordSummary';
import FollowIconPlant from './FollowIconPlant';
import { useGlobalState } from '../config/globalState';

// display one plant record including following icon and plant logs
const PlantRecord = () => {
  const { state } = useGlobalState();
  const { isSignedIn, currentUser } = state;
  const [plantRecord, setPlantRecord] = useState(null);
  const { shedId, plantRecordId } = useParams();
  let history = useHistory();

  // get the plant record including owned user info and plant logs info
  useEffect(() => {
    const findPlantRecord = async () => {
      try {
        const res = await api(`/api/sheds/${shedId}/records/${plantRecordId}`);
        const foundPlantRecord = res.data;
        console.log('found Plant record:', foundPlantRecord);
        if(foundPlantRecord) {
          setPlantRecord(foundPlantRecord);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
    findPlantRecord();
  }, [shedId, plantRecordId]);

  // create a new log for this plant record
  const handleClickNewLog = () => {
    history.push(`/sheds/${shedId}/records/${plantRecordId}/logs/new`);
  }

  return (
    <div>
      {
        plantRecord &&
          <>
            <p className="path">
              <Link to={`/sheds/${shedId}`}> {`${removeDomain(plantRecord.ownedShed.owner.email)}`}</Link>
              {` > ${getUniquePlantName(plantRecord)}`}
            </p>

            {/* following plant record */}
            <FollowIconPlant plantRecord={plantRecord} position="relative"/>

            {/* plant record summary */}
            <PlantRecordSummary plantRecord={plantRecord}/>

            {
              // only the owner of this plant record can create a new log
              isSignedIn && currentUser && currentUser.shed === plantRecord.ownedShed._id &&
                <div className="button-wrapper">
                  <button onClick={handleClickNewLog}
                      className="btn btn-blue button-new-log"
                      type="button"
                      data-cy="button-create-log"
                  >
                    Creat new log
                  </button>
                </div>
            }

            {/* list up all the plants logs */}
            {
              plantRecord.plantLogs.map((plantLog, index) =>
                <PlantLog key={index}
                  shedId={shedId}
                  plantRecordId={plantRecordId}
                  plantLog={plantLog}
                  plantRecord={plantRecord}
                  setPlantRecord={setPlantRecord}/>
              )
            }
          </>
      }
    </div>
  )
}

export default PlantRecord;
