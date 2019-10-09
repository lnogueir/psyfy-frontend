import React from 'react';
import '../../assets/common_style.css';
import Footer from '../../common_components/Footer';
import Header from '../../common_components/Header';
import TherapistSearchCard from '../../common_components/TherapistSearchCard';

class SearchResultPage extends React.Component{
  constructor(){
    super();
    this.page_title = "Search Results"
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
    <div>
      <Header
        name={this.state.name}
        image_src={this.state.image_src}
        page_title = {this.page_title}
      />
      <section className="m20 pt10 pb10 w100c">
        <div className="container-fluid">
          <div className="row" align="center">
            <div className="col">
              <TherapistSearchCard
                email={this.state.email}
                number={this.state.number}
                clinic_address={this.state.clinic_address}
              />
            </div>
            <div className="col">
              <TherapistSearchCard
                email={this.state.email}
                number={this.state.number}
                clinic_address={this.state.clinic_address}
              />
            </div>
            <div className="col">
              <TherapistSearchCard
                email={this.state.email}
                number={this.state.number}
                clinic_address={this.state.clinic_address}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}


}


export default SearchResultPage;
