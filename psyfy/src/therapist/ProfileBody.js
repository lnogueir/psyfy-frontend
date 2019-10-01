import React from 'react';
import TherapistImageUpload from './TherapistImageUpload';
import TherapistForm from './TherapistForm'

function ProfileBody(props){
    return (
      <div className="container mt30 pt20 pb20" align="center">
        <div className="row">
          <div className="col-md-6 col-xl-4">
            <TherapistImageUpload imageSrc={props.userInfo.image_src}/>
          </div>
          <div className="col-md-6 col-xl-8">
              <div className="m10">
                <TherapistForm  userInfo={props.userInfo}/>
              </div>
            </div>
        </div>
      </div>
    )
}


export default ProfileBody;
