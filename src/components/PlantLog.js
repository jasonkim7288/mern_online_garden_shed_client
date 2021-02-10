import React from 'react';
import { convertStringToDateString, dayCount } from '../utilities/date';
import { confirmAlert } from 'react-confirm-alert';
import parse from 'html-react-parser';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { Link } from 'react-router-dom';

// on the plant record page, all the plants logs are listed. This is the one plant log component
const PlantLog = ({ shedId, plantRecordId, plantLog, plantRecord, setPlantRecord }) => {
  const { state } = useGlobalState();
  const { isSignedIn, currentUser } = state;

  // if the user click delete button, remove it
  const handleClickDelete = (event) => {
    // Modal dialog to ask user to delete
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const res = await api.delete(`api/sheds/${shedId}/records/${plantRecordId}/logs/${plantLog._id}`)
              setPlantRecord(res.data);
            } catch (error) {
              console.log(error.response);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }

  return (
    <div className="plantlog-wrapper">
      {
        // if there are at least one photo uploaded, display them
        plantLog.photos && plantLog.photos.length > 0 &&
          <div>
            <hr/>
            <img className="selected-thumbnail" src={plantLog.photos[plantLog.mainPhotoIndex]} alt="main"/>
            <div className="thumbnails-wrapper add-hover">
              {
                plantLog.photos.map((photo, photoIndex) =>
                  <img key={photoIndex}
                      // whenever the user click the thumbnail, it will be displayed with a big size
                      onClick={() => {
                        setPlantRecord({
                          ...plantRecord,
                          plantLogs: plantRecord.plantLogs.map(element =>
                            (element._id === plantLog._id) ?
                              ({
                                ...element,
                                mainPhotoIndex: photoIndex
                              })
                            :
                              element
                          )
                        });
                      }}
                      className="thumbnail-image"
                      src={photo}
                      alt="thumbnail"
                  />
                )
              }
            </div>
          </div>
      }

      {
        // only if the current user owns this plant record, they can delete or edit it
        isSignedIn && currentUser && (currentUser.shed === plantRecord.ownedShed._id) &&
          <div className="mt-10">
            <div className="icon icon-record">
              <i onClick={handleClickDelete} className="far fa-trash-alt add-hover icon-record-delete"></i>
            </div>
            <Link to={`/sheds/${shedId}/records/${plantRecordId}/logs/${plantLog._id}/edit`} className="icon icon-record">
              <i className="far fa-edit add-hover icon-record-edit"></i>
            </Link>
          </div>
      }

      {/* calculate the day count based on the day when the plant record was created */}
      <p className="sub-headings mt-10"><strong>Date:</strong> {`${convertStringToDateString(plantLog.createdAt)} (Day ${dayCount(plantRecord.createdAt, plantLog.createdAt)})`}</p>
      <p className="sub-headings"><strong className="my-notes">My Notes:</strong></p>
      <p className="my-notes">{parse(plantLog.notes)}</p>
    </div>
  );
};

export default PlantLog;
