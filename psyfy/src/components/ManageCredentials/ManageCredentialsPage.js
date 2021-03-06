import React from 'react'
import ManageCredentialsCard from './ManageCredentialsCard'

class ManageCredentialsPage extends React.Component {
    render() {
        return (
            <div className="m15 ml17">
                <h1 className="text-bold-white">Manage Credentials</h1>
                <ManageCredentialsCard />
            </div>
        )
    }
}

export default ManageCredentialsPage;