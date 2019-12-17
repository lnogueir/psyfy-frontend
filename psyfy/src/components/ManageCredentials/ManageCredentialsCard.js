import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import ManageEmail from './ManageEmail'
import ManagePassword from './ManagePassword'
import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}


function ManagePasswordCard() {
    const [value, setValue] = React.useState(0);
    const [isPassword, setIsPassword] = React.useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className="manage-credentials-paper position-relative">
            <div className="d-lg-none">
                <AppBar style={{ borderRadius: '.25em .25em 0 0' }} position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor={isPassword ? 'secondary' : 'primary'}
                        textColor={isPassword ? 'secondary' : 'primary'}
                        variant="fullWidth"
                    >
                        <Tab onClick={() => setIsPassword(false)} style={{ outline: 'none' }} icon={<EmailIcon />} label="Manage Email" />
                        <Tab onClick={() => setIsPassword(true)} style={{ outline: 'none' }} icon={<LockIcon />} label="Manage Password" />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <ManageEmail />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ManagePassword />
                </TabPanel>
            </div>
            <div className="d-none d-lg-flex p30 justify-around">
                <ManagePassword />
                <ManageEmail />
            </div>
            <div className="decoration-manage-credentials-left d-lg-none"></div>
            <div className="decoration-manage-credentials-center d-none d-lg-block"></div>
            <div className="decoration-manage-credentials-right"></div>
        </Paper>
    );
}



export default ManagePasswordCard;
