import React, { useState, useEffect, useRef } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Utils from '../../assets/js/Utils';
import SweetAlert from 'sweetalert2-react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';


const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(2),
        width: 'calc(150px + 35%)',
        borderRadius: '5px',
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic- bezier(.25, .8, .25, 1)',
    },
    button: {
        width: 'calc(150px + 35%)',
        margin: theme.spacing(2),
        '&:focus': { outline: 'none' }
    },
    current_email: {
        margin: theme.spacing(2),
        padding: '8px 20px 8px 20px',
        background: '#dcddde',
        borderLeft: '8px solid #124980',
        borderRadius: '6px',
        fontSize: 'calc(13px + 0.5vw)',
        fontWeight: 700,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    },
    spinner: {
        width: 'calc(150px + 35%)',
        textAlign: 'center'
    },
    margin: {
        margin: theme.spacing(2)
    }
}));


function ManageEmail() {
    const classes = useStyles();
    const [error, setError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const focusInput = useRef();
    useEffect(() => focusInput.current && focusInput.current.focus());

    const handleUpdate = e => {
        e.preventDefault()
        setIsLoading(true)
        const new_email = e.target.elements.new_email.value
        const loggedUser = Utils.getLoggedUser()
        const endpoint = `/site_profiles/${loggedUser.id}/updateUserEmail`
        var req = new Utils.Request()
        req.setAuthorization(loggedUser.token)
        setTimeout(() => {
            req.POST(endpoint, JSON.stringify({ new_email_address: new_email }))
                .then(response => {
                    setIsLoading(false)
                    if (response.status == 422 || response.status == 400) {
                        setError(true)
                    } else if (response.status == 200) {
                        setIsSuccess(true)
                        setTimeout(() => {
                            Utils.logout()
                        }, 800)
                    } else {
                        alert(Utils.ERROR_MESSAGE + 'status: ' + response.status)
                    }
                }).catch(err => {
                    setIsLoading(false)
                    alert(Utils.ERROR_MESSAGE + err)
                })
        }, 500)
    }


    return (
        <React.Fragment>
            <SweetAlert
                show={isSuccess}
                title={"Email Changed Successfully"}
                text="Please log in again with your new email."
                type='success'
                showCancelButton={false}
                showConfirmButton={false}
            />
            <form onSubmit={handleUpdate}>
                <div>
                    <h2>Manage Email</h2>
                    <b className="text-muted">Note:</b>
                    &nbsp;
                        <i>This action will log you out and permantly change your login email.</i>
                </div>
                <div className="mt20 mb20">
                    <span className={classes.current_email}>
                        Current Email:&nbsp;
                        <i>lnogueir@uwaterloo.ca</i>
                    </span>
                    <br />
                    <br />
                    <TextField
                        label="New Email"
                        className={classes.textField}
                        type={"email"}
                        inputRef={focusInput}
                        error={error}
                        name="new_email"
                        margin="normal"
                        variant="filled"
                    />
                    <br />
                    {isLoading ?
                        <div className={classes.spinner}>
                            <Spinner className={classes.margin} animation="border" role="status" />
                        </div>

                        :
                        <Button type="submit" variant="contained" className={classes.button}>
                            Update Email
                        </Button>
                    }
                    {error &&
                        <>
                            <br />
                            <Alert className={classes.margin} variant={"danger"}>
                                Sorry, <b>new email</b> is invalid.
                            </Alert>
                        </>
                    }
                </div>
            </form>
        </React.Fragment>
    )
}

export default ManageEmail