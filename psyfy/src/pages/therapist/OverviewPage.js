import React from 'react';
import '../../assets/common_style.css';
import Footer from '../../common_components/Footer';
import Header from '../../common_components/Header';
import OverviewPreview from '../../common_components/OverviewPreview';
import Page from '../../common_components/Page'
import OverviewTrailer from '../../common_components/OverviewTrailer'


class OverviewPage extends Page{
  constructor(){
    super("Therapist Overview", "Lucas Nogueira", null);
    this.state = {

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
                is_therapist={this.is_therapist}
                handlePageTitleUpdate={this.handlePageTitleUpdate}
                handleImageSrc={this.handleImageSrc}
                image_src={this.image_src}
              />
            </section>
          </div>
          <div className="col-xs-12 col-md-12 col-lg-5 overview-trailer-wrap" align="center">
            <section>
              <OverviewTrailer
                is_therapist={this.is_therapist}
              />
            </section>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }


}


export default OverviewPage;
