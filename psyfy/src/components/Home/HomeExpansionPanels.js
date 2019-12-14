import React from 'react';
import DoctorPanel from './DoctorPanel';
import PatientPanel from './PatientPanel';


function HomeExpansionPanels(props) {
    return (
        <div data-aos="fade-up" className="m40">
            <DoctorPanel />
            <PatientPanel />
        </div>
    )
}

export default HomeExpansionPanels;
