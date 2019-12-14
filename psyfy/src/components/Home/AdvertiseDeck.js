import React from 'react';
import AdvertiseCard from './AdvertiseCard';
import CARD1_IMG from '../../assets/images/vietnamise_relax.jpeg';
import CARD2_IMG from '../../assets/images/purpose.jpeg';
import CARD3_IMG from '../../assets/images/look_ahead.jpeg';


function AdvertiseDeck() {

    return (
        <div className="home-deck-row row">
            <div data-aos="fade-right" className="col-sm-12 col-md-4 col-lg-4 d-flex align-items-stretch">
                <AdvertiseCard title={"Piece"} src={CARD1_IMG}>
                    At PsyCare we strive to find you the best therapist in your area need.
                    We rely on them to keep and maintain your inner pieace.
                </AdvertiseCard>
            </div>
            <div data-aos="slide-up" className="col-sm-12 col-md-4 col-lg-4 d-flex align-items-stretch">
                <AdvertiseCard title={"Purpose"} src={CARD2_IMG}>
                    The most common reason for mental health issues is the lack of a "purpose".
                    Let our doctors help you find yours.
                </AdvertiseCard>
            </div>
            <div data-aos="fade-left" className="col-sm-12 col-md-4 col-lg-4 d-flex align-items-stretch">
                <AdvertiseCard title={"Future"} src={CARD3_IMG}>
                    At PsyCare we strive to find you the best therapist in your area need.
                    We rely on them to keep and maintain your inner pieace.
                </AdvertiseCard>
            </div>
        </div >
    )
}


export default AdvertiseDeck;               