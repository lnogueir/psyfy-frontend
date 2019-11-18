import React from 'react';
import '../assets/common_style.css';
import ProfileBody from './ProfileBody';
import Footer from '../common_components/Footer';
import Header from '../common_components/Header';


class TherapistAccountPage extends React.Component{
  constructor(){
    super();
    this.page_title = "My Account"
    this.state = {
      name: "Lucas Nogueira" ,
      email: "jawy2@uwaterloo.ca",
      number: "226 978 5884",
      clinic_address: "386 Beechdrops Dr",
      image_src: null,
    }
  }


  handleChangeState = (key,value) => {
    this.setState({
      [key]: value
    })
  }



  getProfile = () => {
    const url = "http://192.168.0.20:3000/api/site_users/5/profile";
    fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "woGSD2gPwRzgQ1eymUg05C9N3zxK8Qv9Cm0YOQCJRML3mAvyA1pX1mez2lG0lyIq"
      }
    })
    .then(response=>response.json())
    .then(json_response=>console.log(json_response))
  }



  render(){
    return (
      <div>
        <Header
          name={this.state.name}
          image_src={this.state.image_src}
          page_title = {this.page_title}
        />
        <div className="bg-psyfy-body">
          <ProfileBody
            handleChangeState = {this.handleChangeState}
            userInfo={this.state}
          />
        </div>
        <Footer />
      </div>
    );
  }
};

export default TherapistAccountPage;
