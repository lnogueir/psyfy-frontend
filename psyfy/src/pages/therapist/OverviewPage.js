import React from 'react';
import '../../assets/common_style.css';
import Footer from '../../common_components/Footer';
import Header from '../../common_components/Header';
import OverviewPreview from '../../common_components/OverviewPreview';
import LoggedInPage from '../../common_components/LoggedInPage'
import OverviewTrailer from '../../common_components/OverviewTrailer'


class OverviewPage extends LoggedInPage{
  constructor(){
    super("Therapist Overview", "Lucas Nogueira", null);
    this.state = {
      // page_title: "Therapist Overview",
      // image_src: null,
    }
  }


  render(){
    return (
      <React.Fragment>
        <Header
          name={this.user_name}
          image_src={this.image_src}
          page_title = {this.page_title}
        />
        <div className="row">
          <div className="col-xs-12 col-md-12 col-lg-7 overview-preview-wrap">
            <section>
              <OverviewPreview
                handlePageTitleUpdate={this.handlePageTitleUpdate}
                handleImageSrc={this.handleImageSrc}
                image_src={this.image_src}
              />
            </section>
          </div>
          <div className="col-xs-12 col-md-12 col-lg-5 overview-trailer-wrap" align="center">
            <section>
              <OverviewTrailer />
            </section>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }


}


export default OverviewPage;
