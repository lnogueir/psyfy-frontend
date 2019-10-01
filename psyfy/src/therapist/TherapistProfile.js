import React from 'react';
import '../assets/common_style.css';
import ProfileBody from './ProfileBody';
import Footer from '../common_components/Footer';
import Header from '../common_components/Header'


class TherapistProfile extends React.Component{
  constructor(){
    super();
    this.state = {
      name: "Lucas Nogueira" ,
      email: "lnogueir@uwaterloo.ca",
      number: "226 978 5884",
      clinic_address: "386 Beechdrops Dr",
      city: "Waterloo",
      province:"Ontario",
      postal_code:"N2V 0E6",
      image_src: "../assets/images/profile_fill.png"
    }
  }


  render(){
    return (
      <div>
        <Header
          name={this.state.name}
          image_src={this.state.image_src}
        />
        <div className="bg-psyfy-body">
          <ProfileBody

            userInfo={this.state}
          />
        </div>
        <Footer />
      </div>
    );
  }
};

export default TherapistProfile;
