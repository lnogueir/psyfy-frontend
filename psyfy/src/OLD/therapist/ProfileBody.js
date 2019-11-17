import React from 'react';
import TherapistImageUpload from './TherapistImageUpload';
import TherapistForm from './TherapistForm'

function ProfileBody(props){
    return (
      <div className="container mb30 mt60 pt20 pb20" align="center" style={{justifyContent:"space-evenly"}}>
        <div className="row">
          <div className="col-md-7 col-xl-5">
            <TherapistImageUpload handleChangeState={props.handleChangeState} imageSrc={props.userInfo.image_src}/>
          </div>
          <div className="col-md-5 col-xl-7">
              <TherapistForm  userInfo={props.userInfo}/>
          </div>
        </div>
      </div>
    )
}


export default ProfileBody;
