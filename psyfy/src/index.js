import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
import OverviewPage from './pages/therapist/OverviewPage';
=======
import OverviewPage from './pages/therapist/OverviewPage'
import TherapistForm from './pages/therapist/TherapistForm'
import TestPage from './pages/public/LoginCardPage'
>>>>>>> fazendo mudancas no  login
import * as serviceWorker from './serviceWorker';




ReactDOM.render(<TestPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
