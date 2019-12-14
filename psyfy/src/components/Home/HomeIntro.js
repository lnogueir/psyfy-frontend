import React from 'react'
import Fab from '@material-ui/core/Fab'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import HomeSearch from './HomeSearch'
import Overlay from '../Overlay'
import RequestAccountCard from '../RequestAccount/RequestAccountCard'
import $ from 'jquery'
import AOS from 'aos'

function HomeIntro() {
    const [isSearch, setIsSearch] = React.useState(false)
    const [isRequest, setIsRequest] = React.useState(false)

    const onSearchClick = () => {
        $('.home-right-side-wrap').css('height', 'auto')
        setIsSearch(true)
        setTimeout(() => {
            const offset = window.innerWidth < 760 ? 555 : 579;
            const scroll_amount = $("#search-card-ref").offset().top - offset;
            $('html, body').animate({
                scrollTop: scroll_amount
            }, 1200, () => AOS.refresh());
        }, 150)

    }

    const onCloseClick = () => {
        $("#search-card-ref").addClass('fadeOutDown')
        $('html, body').animate({
            scrollTop: 0
        }, 1200, () => {
            $('.home-right-side-wrap').css('height', '55vh')
            setIsSearch(false)
            AOS.refresh()
        });
    }

    const scrollToContent = () => {
        $('html, body').animate({
            scrollTop: 900
        }, 1200);
    }

    return (
        <React.Fragment>
            <Overlay
                toggleDisplay={() => setIsRequest(!isRequest)}
                should_display={isRequest}
                className={"overlay-content-request"}
            >
                <RequestAccountCard />
            </Overlay>
            <div className="home-right-side-wrap">
                <div className="align-on-md-home-intro">
                    <h1 id="home-main-title" className="text-bold-white">Finding a therapist,<br />now easy for everyone</h1>
                    <p className="main-home-description">
                        We list all the best therapists in Canada.
                  <br />
                        If you are here, you are either one of them or you look for them.
                </p>
                </div>
                <div align="center" className="justify-around intro-buttons-wrap">
                    <button onClick={() => setIsRequest(true)} className="logbtn-inverted">
                        Get Listed
                    </button>
                    <button onClick={scrollToContent} className="logbtn-inverted">
                        Learn More
                  </button>
                </div>
                <div className="home-search-opener-wrap">
                    {
                        !isSearch &&
                        <div align="center" className="home-intro-search-opener animated fadeIn">
                            <Fab onClick={onSearchClick} variant="extended" color="default">
                                <SearchIcon />&nbsp;Search
                            </Fab>
                        </div>
                    }
                    {
                        isSearch &&
                        <div id="search-card-ref" className="animated fadeInUp">
                            <Fab size="medium" className="home-intro-search-closer" onClick={onCloseClick} color="primary">
                                <CloseIcon />
                            </Fab>
                            <HomeSearch />
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default HomeIntro;