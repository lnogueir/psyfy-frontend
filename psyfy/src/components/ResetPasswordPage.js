import React from 'react'
import Utils from '../assets/js/Utils'


class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { new_password: undefined }
        this.token = this.props.match.params.token
    }

    handleReset = () => {
        var req = new Utils.Request()
        req.setAuthorization(this.token)
        const endpoint = "/site_users/reset-password"
        const data = { newPassword: this.state.new_password }
        req.POST(endpoint, JSON.stringify(data))
            .then(response => {
                if (response.status != 204) {
                    alert(Utils.ERROR_MESSAGE + 'status: ' + response.status)
                }
            }).catch(err => alert(Utils.ERROR_MESSAGE + err))
    }

    render() {
        return (
            <div style={{ minHeight: '90vh' }}>
                <input onChange={e => this.setState({ new_password: e.target.value })} type="password" />
                <button onClick={this.handleReset}>Submit</button>
            </div>
        )
    }
}

export default ResetPasswordPage;