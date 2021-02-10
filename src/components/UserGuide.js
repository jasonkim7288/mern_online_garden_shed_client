import React from 'react';

const UserGuide = () => {
  return (
    <div>
      <h1 className="title">User Guide </h1>
      <strong>Overview</strong>
      <p>
        This user guide serves the purpose of providing the users of the Online Garden Shed application with a complete breakdown of
        all the features available to them. In doing so it’s our hope one may reap the maximum benefit that the Online Garden Shed has to offer.
      </p>
      <br/>
      <p>
        The Online Garden Shed application is responsive and mobile-friendly. This means you may view the application on your smartphone graphics tablet, laptop or desktop computer.
      </p>
      <br/>
      <strong>At a glance</strong>
        <div className="at-a-glance-items">

          <div className="at-a-glance-item-wrapper">
            <img className="user-guide-image" src="/iconEdit.png" width="30px" alt="edit icon"></img>
            Edit a plant record or plant log.
          </div>

          <div className="at-a-glance-item-wrapper">
            <img className="user-guide-image" src="/iconDelete.png" width="30px" alt="delete icon"></img>
            Delete a plant log or entire plant record.
          </div>

          <div className="at-a-glance-item-wrapper">
            <img className="user-guide-image"src="/iconShedFollowDark.png" width="30px" alt="follow garden shed icon"></img>
            <img className="user-guide-image"src="/iconShedFollowLight.png" width="30px" alt="unfollow garden shed icon"></img>
            Dark/solid icon indicates plants followed.
          </div>

          <div className="at-a-glance-item-wrapper">
            <img className="user-guide-image"src="/iconPlantFollowDark.png" width="30px" alt="follow plant icon"></img>
            <img className="user-guide-image"src="/iconPlantFollowLight.png" width="30px" alt="unfollow plant icon"></img>
            Dark/solid icon indicates plants followed.
          </div>

          <div className="at-a-glance-item-wrapper">
            <img className="user-guide-image" src="/buttonSearch.png" alt="search button"></img>
            Search for plants to create a record.
          </div>

          <div className="at-a-glance-item-wrapper">
            <img className="user-guide-image" src="/buttonCreateNewLog.png" alt="create new log button"></img>
            For creating a new log.
          </div>

          <div className="at-a-glance-item-wrapper">
            <img className="user-guide-image" src="/buttonMoreDetails.png" alt="more details button"></img>
            Initial notes of the record.
          </div>

          <div className="at-a-glance-item-wrapper">
            <img className="user-guide-image" src="/buttonChooseFiles.png" alt="choose files button"></img>
            For uploading your plant images.
          </div>

          <div className="at-a-glance-item-wrapper">
            <img className="user-guide-image" src="/buttonSubmit.png" alt="submit button"></img>
            Adds the log to the record.
          </div>

          <div className="at-a-glance-item-wrapper">
            <img className="user-guide-image" src="/buttonCreateRecord.png" alt="create record button"></img>
            Create New Record
          </div>

        </div>
        <br/>
        <strong>Guest</strong>
        <p>
          At the Landing page you will find the Guest button. Guest mode allows you to access several features in the Online Garden Shed. The following is what you have access to in guest mode.
          <ul>
            <li>All Garden Sheds list</li>
            <li>Plant records </li>
            <li>Mission statement</li>
          </ul>
        </p>
      <br/>
      <strong>Sign in with Google</strong>
      <p>
        At the Landing page you will find the Sign in with Google button. You will need a google account for this. Once logged in you will have access to all features of the application. The following are the features you have access to when signed in with google.
      </p>
      <ul>
        <li>My Garden Shed</li>
        <li>All Garden Sheds list</li>
        <li>Plant records</li>
        <li>Following - Garden sheds</li>
        <li>Following - Plants</li>
        <li>Your following list</li>
        <li>Create plant record</li>
        <li>Create plant log</li>
        <li>Edit plant log</li>
        <li>Edit plant record</li>
        <li>Delete plant log</li>
        <li>Delete plant record</li>
        <li>User Guide</li>
        <li>Mission Statement</li>
        <li>Your profile</li>
      </ul>
      <br/>
      <strong>Menus / Navbars</strong>
      <p>
        There are two versions of the menu. One is up the top of the screen in mobile devices and smaller screens, while larger screens like laptops and desktop computers use the side navbar.
      </p>
      <br/>
      <strong>Navigating using the paths</strong>
      <p>
        In the top of the screen just under the navbar you will see a “path” it is clickable and used to navigate back to the previous page. Each part in the path is separated by "&gt;” to indicate a different page.
      </p>
      <br/>
      <p>
        On the mobile devices you can click the 3 horizontal lines (known as a hamburger menu) in the top right of the screen to access the menu.
        At any point in time you can click the Title in the top navbar to get back to the All Garden Sheds list.
      </p>
      <br/>
      <strong>My Garden Shed</strong>
      <p>
        This section will contain all of your plant records. When you sign in with google for the very first time your garden shed will be blank. After creating records they will be located here. These records appear as thumbnails (small images) and are clickable.
      </p>
      <br/>
      <strong>Create Record</strong>
      <p>
        To create a plant record, click the Create Record button in the menu. Here you will be presented with a search bar that has access to an API for plants. Please note that what’s in this database is out of our control, so we make no guarantees about any particular plant that you’re looking for being available.
      </p>
      <br/>
      <p>
        After typing in your plant name and clicking the Search button on the right you should have a list of plant thumbnails to choose from.
      </p>
      <br/>
      <p>
        Click any of the thumbnails to enter it. From here you will be able to write any initial notes you feel are important. Once done you can click the Create New record button.
      </p>
      <br/>
      <strong>Create New Log</strong>
      <p>
        Under the plant record you just created you will see a button Create New Log. Click this to add a new log to the plant record.
      </p>
      <br/>
      <p>
        Within here you will be able to add your notes about growing the plant and also choose upto 5 images per log that you create. To upload photos of your plant click the Choose Files button. When you have chosen your images to upload, take note of the radio buttons above each image thumbnail. This allows you to choose the image you want to set as your main image.
      </p>
      <br/>
      <p>
        Once you’re done you may click the Submit button to add the new log to the plant record. For your benefit there is a Date that is visible for every log added and a day count from the creation of the first record until the most recent log added into you plants record
      </p>
      <br/>
      <strong>Editing and Deleting </strong>
      <p>
        You may edit any of your plant records and logs, however it is advised in order to keep the integrity of a plant record that you try to avoid this when you can, except during the creation of a new log.
      </p>
      <br/>
      <p>
        Logs can be easily edited and deleted, but note that when you try and delete a plant record you will be prompted with a pop up message. This is because a plant record contains all the logs for that plant, basically you’ll lose all of the growing history of that plant record.
      </p>
      <br/>
      <strong>Following</strong>
      <p>
        Every garden shed and plant record has an icon located in the top left corner. By default it will be an outline/light meaning you’re not currently following it. You may click the icon to start following and it will turn solid/dark.
      </p>
      <br/>
      <p>
        Every garden shed and plant record has an icon located in the top left corner. By default it will be an outline/light meaning you’re not currently following it. You may click the icon to start following and it will turn solid/dark.
      </p>
      <br/>
      <p>
       The Following pages will display all garden sheds and plant records you’re following. You can remove them by clicking the icons and unfollowing them at any time.
      </p>


    </div>
  );
};

export default UserGuide;
