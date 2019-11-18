import React, { useState, useEffect, useRef } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityOnIcon from '@material-ui/icons/Visibility';
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
    icon: {
        cursor: 'pointer',
        opacity: 0.5,
        '&:hover': {
            opacity: 1,
            transition: '0.5s ease',
        }
    },
    button: {
        width: 'calc(150px + 35%)',
        margin: theme.spacing(2),
        '&:focus': { outline: 'none' }
    },
    spinner: {
        width: 'calc(150px + 35%)',
        textAlign: 'center'
    },
    margin: {
        margin: theme.spacing(2)
    }
}));

function ManagePassword() {
    const classes = useStyles();
    const [error, setError] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const focusInput = useRef();
    useEffect(() => focusInput.current && focusInput.current.focus());

    const handleUpdate = e => {
        e.preventDefault()
        setIsLoading(true)
        const old_password = e.target.elements.old_password.value
        const new_password = e.target.elements.new_password.value
        const loggedUser = Utils.getLoggedUser()
        const endpoint = `/site_profiles/${loggedUser.id}/customChangePassword`
        var req = new Utils.Request()
        req.setAuthorization(loggedUser.token)
        setTimeout(() => {
            req.POST(endpoint, JSON.stringify({
                old_password: old_password,
                new_password: new_password
            }))
                .then(response => {
                    setIsLoading(false)
                    if (response.status == 400 || response.status == 401) {
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
                title={"Password Changed Successfully"}
                text="Please log in again with your new password."
                type='success'
                showCancelButton={false}
                showConfirmButton={false}
            />
            <form onSubmit={handleUpdate}>
                <div>
                    <h2>Manage Password</h2>
                    <b className="text-muted">Note:</b>
                    &nbsp;
                <i>This action will log you out and permantly change your password.</i>
                </div>
                <div className="mt20 mb20">
                    <TextField
                        label="Current Password"
                        error={error}
                        inputRef={focusInput}
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="filled"
                        name="old_password"
                    />
                    <br />
                    <TextField
                        label="New Password"
                        className={classes.textField}
                        type={isVisible ? "text" : "password"}
                        name="new_password"
                        margin="normal"
                        variant="filled"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    onClick={() => setIsVisible(!isVisible)}
                                    className={classes.icon}
                                    position="end"
                                >
                                    {isVisible ? <VisibilityOnIcon /> : <VisibilityOffIcon />}
                                </InputAdornment>
                            ),
                        }}
                    />
                    <br />
                    {isLoading ?
                        <div className={classes.spinner}>
                            <Spinner className={classes.margin} animation="border" role="status" />
                        </div>
                        :
                        <Button type="submit" variant="contained" className={classes.button}>
                            Update Password
                        </Button>
                    }
                    {error &&
                        <>
                            <br />
                            <Alert className={classes.margin} variant={"danger"}>
                                Sorry, invalid <b>current password</b>.
                            </Alert>
                        </>
                    }
                </div>
            </form>
        </React.Fragment>
    )
}

export default ManagePassword;