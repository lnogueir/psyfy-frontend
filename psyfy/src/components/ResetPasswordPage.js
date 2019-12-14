import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityOnIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import Utils from '../assets/js/Utils'
import SweetAlert from 'sweetalert2-react';
import Spinner from 'react-bootstrap/Spinner';


const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(2),
        width: 'calc(150px + 35%)',
        borderRadius: '5px 5px 0 0',
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
        width: 'calc(120px + 15%)',
        margin: theme.spacing(2),
        '&:focus': { outline: 'none' }
    },
    spinner: {
        width: 'calc(150px + 35%)',
        position: 'relative',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)'
    }
}));


function ResetPasswordPage(props) {
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newPassword, setNewPassword] = useState(undefined)
    const token = props.match.params.token

    const handleReset = () => {
        setIsLoading(true)
        var req = new Utils.Request()
        req.setAuthorization(token)
        const endpoint = "/site_users/reset-password"
        const data = { newPassword: newPassword }
        setTimeout(() => {
            req.POST(endpoint, JSON.stringify(data))
                .then(response => {
                    if (response.status != 204) {
                        alert(Utils.ERROR_MESSAGE + 'status: ' + response.status)
                        setIsLoading(false)
                    } else {
                        setIsSuccess(true)
                        setIsLoading(false)
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 800)
                    }
                }).catch(err => {
                    setIsLoading(false)
                    alert(Utils.ERROR_MESSAGE + err)
                })
        }, 500)
    }

    return (
        <div align="center" className="forgot-password-body">
            <SweetAlert
                show={isSuccess}
                title={"Password Reset Successfully"}
                text="Please log in again with your new password."
                type='success'
                showCancelButton={false}
                showConfirmButton={false}
            />
            <div className="flex-column">
                <h2 className="text-bold-white">Reset Password</h2>
                <TextField
                    label="New Password"
                    className={classes.textField}
                    type={isVisible ? "text" : "password"}
                    name="new_password"
                    margin="normal"
                    variant="filled"
                    value={newPassword}
                    onChange={e => { setNewPassword(e.target.value) }}
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
                {isLoading ?
                    <div className={classes.spinner}>
                        <Spinner className={classes.margin} animation="border" role="status" />
                    </div>
                    :
                    <Button onClick={handleReset} type="submit" variant="contained" className={classes.button}>
                        Reset Password
                </Button>
                }
            </div>
        </div>
    )

}

export default ResetPasswordPage;