import React from 'react';
import '../../assets/common_style.css';
import Footer from '../../common_components/Footer';
import Header from '../../common_components/Header';
import OverviewPreview from '../../common_components/OverviewPreview';


class OverviewPage extends React.Component{
  constructor(){
    super();
    this.page_title = "Therapist Overview"
    this.state = {
      name: "Lucas Nogueira" ,
      email: "jawy2@uwaterloo.ca",
      number: "226 978 5884",
      clinic_address: "386 Beechdrops Dr",
      image_src: null,
    }
  }

render(){
  return (
    <React.Fragment>
      <Header
        name={this.state.name}
        image_src={this.state.image_src}
        page_title = {this.page_title}
      />
      <div className="row fluid">
        <div style={{paddingRight:"0px"}} className="col-xs-12 col-md-12 col-lg-6">
          <section className="mt20 mb10">
            <OverviewPreview />
          </section>
        </div>
        <div className="col-xs-12 col-md-12 col-lg-6 m15" align="center">
          <div style={{height:400, width: 500, backgroundColor:"purple"}}></div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}


}


export default OverviewPage;
