import React from 'react'
import Paper from '@material-ui/core/Paper';

function AdvertiseCard(props) {
    return (
        <Paper className="home-adv-card">
            <img className="adv-card-img" src={props.src} />
            <div>
                <h1 className="home-adv-card-titles">{props.title}</h1>
                <div className="text-muted home-adv-card-desc">
                    {props.children}
                </div>
            </div>
        </Paper>
    )
}

export default AdvertiseCard;