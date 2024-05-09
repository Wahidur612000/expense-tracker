import React, { useState } from 'react';
import './profilePage.css'; 

const ProfilePage = () => {
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  

  const handleUpdateProfile = () => {
    const token=localStorage.getItem('token');

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyABaG4S_aphDMO1LCWGC_o8rfNrqtaDdgw`, 
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: fullName,
          photoUrl: photoUrl,
          deleteAttribute: null,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errormessage = "Authentication Failed";
          if (data && data.error && data.error.message) {
            errormessage = data.error.message;
          }

          throw new Error(errormessage);
        });
      }
    })
    .then((data) => {
      console.log("Complete profile page---", data);
    })
    .catch(error => {
      // Handle error
      console.error('Error updating profile:', error);
    });
    setFullName('')
    setPhotoUrl('')
  };

  const handleGetProfile = () => {
    const token=localStorage.getItem('token');

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyABaG4S_aphDMO1LCWGC_o8rfNrqtaDdgw`, 
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {

          let errormessage = "Authentication Failed";
          if (data && data.error && data.error.message) {
            errormessage = data.error.message;
          }

          throw new Error(errormessage);
        });
      }
    })
    .then((data) => {
      console.log("Get profile page---", data);
      if (data.users && data.users.length > 0) {
        const user = data.users[0];
        setFullName(user.displayName);
        setPhotoUrl(user.photoUrl);
      } else {
        throw new Error("User data not found");
      }
    })
    .catch(error => {
      // Handle error
      console.error('Error updating profile:', error);
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="quote">Winners never quit, Quitters never win.</div>
        <div className="profile-completion">
          <div className="completion-text">Your Profile is only 64% updated.</div>
          <button className="complete-now" onClick={handleUpdateProfile}>Complete now</button>
        </div>
      </div>
      <div className="red-line"></div>
      <div className="profile-form">
        <div className="form-title">Contact details</div>
        <div className="input-group">
          <img src="https://img.icons8.com/?size=64&id=4Z2nCrz5iPY2&format=png"  className="icon" />
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <img src="https://img.icons8.com/?size=80&id=7gn1JUOaj7KZ&format=png"  className="icon" />
          <input
            type="text"
            placeholder="Enter profile photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button className="complete-now1" onClick={handleUpdateProfile}>Update</button>
          <button className="complete-now1" onClick={handleGetProfile}>Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;