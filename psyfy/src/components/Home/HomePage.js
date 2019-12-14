import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import HomeSearch from './HomeSearch'
import AdvertiseDeck from './AdvertiseDeck'
import HomeIntro from './HomeIntro'
import Paper from '@material-ui/core/Paper'
import HomeExpansionPanels from './HomeExpansionPanels'

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      mirror: false,
      offset: 150
    })
  });
  return (
    <React.Fragment>
      <section className="home-page-section">
        <Paper className="beta-testing-note-container">
          <span>
            <b>Note:&nbsp;</b>We've started our first round of beta testers all around <b>Canada.</b> We've entered in contact with some of the brightests therapists and we are excited to let you guys be the first ones to test our website!&nbsp;We look forward to improve our product as it is tested by you, the user. Watch out for our <b><i>official</i></b> release for patients on <b>20/05/2020</b>!
          </span>
          <i>Official Beta Release</i>
        </Paper>
        <div className="container-fluid main-home-m-top-lg">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <HomeIntro />
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <HomeSearch />
            </div>
          </div>
        </div>
      </section>
      <section className="adv-cards-section">
        <AdvertiseDeck />
      </section>
      <section>
        <HomeExpansionPanels />
      </section>
    </React.Fragment>
  )
}


export default HomePage;
