import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import api from '../config/api';
import { convertStringToDateString, getCurrentDate } from '../utilities/date';
import { uploadFile } from 'react-s3';
import ProgressFullScreen from './ProgressFullScreen';
import { removeDomain } from '../utilities/strings';
import { handleError } from '../config/errorHandler';
import { useGlobalState } from '../config/globalState';

// configuration for uploading S3 bucket
const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  region: 'ap-southeast-2',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
};

// This component is for creating or editing a plant log
const FormLog = ({ action }) => {
  const { state, dispatch } = useGlobalState();
  const { isSignedIn } = state;
  const { shedId, plantRecordId, logId } = useParams();
  const [plantRecord, setPlantRecord] = useState(null);
  const [notes, setNotes] = useState('');
  // store file objects that come from the result of input file tag
  const [filesToUpload, setFilesToUpload] = useState(null);
  // filePaths can have image binary if they are from the input file tag.
  // They can have also s3 buceket URL if they are alreay in AWS.
  // Both of them can be displayed with img tag.
  const [filePaths, setFilePaths] = useState(null);
  // current Index is to store the main image for this log
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editLog, setEditLog] = useState(null);
  // creating a log takes a lot of time depending on the filed to upload to S3 bucket
  const [isInProgress, setIsInProgress] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  let history = useHistory();

  // find the record where the log is saved.
  useEffect(() => {
    const findPlantRecord = async () => {
      const res = await api.get(`/api/sheds/${shedId}/records/${plantRecordId}`);
      const foundPlantRecord = res.data;
      console.log('found Plant record:', foundPlantRecord);
      if(foundPlantRecord) {
        setPlantRecord(foundPlantRecord);
        console.log(new Date(foundPlantRecord.createdAt));
      }
    }

    try{
      findPlantRecord();
    } catch (error) {
      console.log("error.response: ", error.response);
      history.push('/sheds');
    }
  }, [history, shedId, plantRecordId]);

  useEffect(() => {
    // when this form came form edit, find the log and setup the form states
    if (plantRecord !== null && action === 'edit') {
      const foundLog = plantRecord.plantLogs.find(plantLog => plantLog._id === logId);
      if (foundLog) {
        const { notes, photos, mainPhotoIndex } = foundLog;
        setNotes(notes);
        setFilePaths(photos);
        setCurrentIndex(mainPhotoIndex);
        setEditLog(foundLog);
      } else {
        history.push('/');
      }
    }
  }, [plantRecord, action, logId, history]);

  // whenever the files are selected, need to read the file and add it to the filePaths
  // so that the user can immediately see the images that they chose.
  useEffect(() => {
    const readAndPreview = file => {
      let reader = new FileReader();

      reader.addEventListener('load', () => {
        console.log('reader.result:', file.name);
        setFilePaths([...filePaths, reader.result]);
        console.log('filePaths.length:', filePaths.length);

      }, false);
      reader.readAsDataURL(file);
    };

    if (filesToUpload && filePaths && filesToUpload.length !== 0 && filesToUpload.length > filePaths.length) {
      readAndPreview(filesToUpload[filePaths.length]);
    }
  }, [filePaths, filesToUpload]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (notes.length > 1000) {
      setErrMsg('Please input notes maximum 1000 characters.');
    } else if (filesToUpload && filesToUpload.length > 5) {
        setErrMsg('Please upload maximum 5 files');
    } else {
      let fileLocations = [];
      // run the progress animation
      setIsInProgress(true);

      // upload file to S3 bucket
      if (filesToUpload) {
        for(let i = 0; i < filesToUpload.length; i++) {
          try {
            const data = await uploadFile(filesToUpload[i], config);
            console.log(data);
            fileLocations.push(data.location);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        if (action === 'edit') {
          fileLocations = filePaths;
        }
      }

      console.log('fileLocations:', fileLocations);
      let newLog = {
        photos: fileLocations,
        mainPhotoIndex: currentIndex,
        // take care about the new line
        notes: notes.replace(/\n/g, '<br>')
      };
      console.log('new log:', newLog);

      // post for creating a new log and put for updating the existing log
      try {
        let res;
        if (action === 'edit') {
          res = await api.put(`api/sheds/${shedId}/records/${plantRecordId}/logs/${logId}`, newLog);
        } else {
          res = await api.post(`api/sheds/${shedId}/records/${plantRecordId}/logs`, newLog);
        }
        console.log(res.data);
        history.push(`/sheds/${shedId}/records/${plantRecordId}`);
      } catch (error) {
        console.log("error:", error.response);
        handleError(error, history, isSignedIn, dispatch);
      } finally {
        // stop the progress animation
        setIsInProgress(false);
      }
    }
  };

  const handleChangeNotes = event => {
    setNotes(event.target.value);
  };

  const handleChangeFiles = event => {
    console.log('event.target.files:', event.target.files);

    const { files } = event.target;

    if (files.length > 5) {
      setErrMsg('Please upload maximum 5 files');
    } else {
      setFilesToUpload(files);
      setFilePaths([]);
      setCurrentIndex(0);
    }
  };

  // select the main image
  const handleChangeMain = event => {
    console.log('event.target.value:', typeof event.target.dataset.value);
    setCurrentIndex(parseInt(event.target.dataset.value));
  };

  return (
    <div>
      {/* display progress animation while creating or editing log */}
      { isInProgress && <ProgressFullScreen />}

      {
        plantRecord &&
          <>
            <p className="path">
              <Link to={`/sheds/${shedId}`}> {`${removeDomain(plantRecord.ownedShed.owner.email)}`}</Link>
              <Link to={`/sheds/${shedId}/records/${plantRecord._id}`}> {`> ${plantRecord.commonName}`}</Link>
              {
                (action === 'edit') ?
                  <>
                    {editLog && ` > ${convertStringToDateString(editLog.createdAt)}`}
                  </>
                :
                  <>
                    {"> Create New log"}
                  </>
              }

            </p>
          </>
      }
      <h1 className="title">{action === "edit" ? "Edit Log": "Create New Log"}</h1>
      <p className="current-date">{`Date: ${getCurrentDate()}`}</p>
      <form onSubmit={handleSubmit}>
        {
          errMsg &&
            <p className="err-msg">{errMsg}</p>
        }
        <textarea className="description-input"
          name="description"
          rows="5"
          placeholder="Notes"
          value={notes}
          onChange={handleChangeNotes}
          autoFocus
          data-cy="my-notes"
        />
        <input multiple onChange={handleChangeFiles} type="file" name="image-upload"/>
        {
          filePaths && filePaths.length > 0 &&
          <>
            <p id="select-main-image">Select Main Image</p>
            <div className="thumbnails-wrapper">
              {
                filePaths.map((file, index) => (
                  <div className="thumbnail-wrapper" key={index}>
                    <input
                      type="radio"
                      className="thumbnail-radio-button add-hover"
                      name="thumbnail-radio-button"
                      data-value={index}
                      onChange={handleChangeMain}
                      checked={index === currentIndex}
                    />
                    <img key={index} className="thumbnail-image add-hover" src={file} alt="thumbnail" data-value={index}
                    onClick={handleChangeMain}/>
                  </div>
                ))
              }
            </div>
            <img className="selected-thumbnail" src={filePaths[currentIndex]} alt="seleted thumbnail main plant"/>
          </>
        }
        <button className="btn btn-blue " type="submit" data-cy="submit-create-log">Submit</button>
      </form>
    </div>
  )
}

export default FormLog;
