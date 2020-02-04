import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

import { Translate } from 'react-redux-i18n'

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountButton from '../header/AccountButton.component';
import LanguagePicker from '../header/LanguagePicker.component';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import TodayIcon from '@material-ui/icons/Today';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import navigationStyles from './navigation.styles'

const styles = navigationStyles;

class MiniDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            anchorEl: null,
        };

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
    };

    handleDrawerOpen() {
        this.setState({ open: true });
    };

    handleDrawerClose() {
        this.setState({ open: false });
    };

    redirect = link => {
        this.props.history.push(link);
    };

    currentTab(path) {
        switch (path) {
            case '/':
                return <Translate value='tabs.dashboard' />
            case '/patients':
                return <Translate value='tabs.patients' />
            case '/apointments':
                return <Translate value='tabs.apointments' />
            case '/pathologies':
                return <Translate value='tabs.pathologies' />
            default:
                return ''
        }
    }

    isTabActive(selectedTab) {
        return (selectedTab === this.props.history.location.pathname)
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)} >
                    <Toolbar disableGutters={!this.state.open}
                        style={{ marginRight: '10px' }}>
                        <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, this.state.open && classes.hide)} >
                            <MenuIcon />
                        </IconButton>
                        <Typography color="inherit" className={classes.AppBarTypography}>
                            {this.currentTab(this.props.history.location.pathname)}
                        </Typography>

                        <LanguagePicker />

                        <IconButton>
                            <Badge badgeContent={1} color="primary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <AccountButton />

                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >

                    <div className={classes.toolbar}>
                        <div className={classes.logoDiv} onClick={() => this.redirect("/")} >
                            <DirectionsRunIcon color='primary' fontSize='large' />
                            <h3 className={classes.backgrounColorText}>Physio Manager</h3>
                        </div>
                        <IconButton onClick={this.handleDrawerClose} aria-owns={open ? 'menu-appbar' : null} >
                            <ChevronLeftIcon className={classes.backgrounColorText} />
                        </IconButton>

                    </div>

                    <Divider />
                    <List className={classes.sidebarList}>
                        <ListItem className={this.isTabActive('/') ? classes.activeSidebarButton : classes.sidebarButton} button onClick={() => this.redirect("/")} key={'dashboard'} >
                            <ListItemIcon ><DashboardIcon className={classes.backgrounColorText} /></ListItemIcon>
                            <ListItemText className={classes.backgrounColorText} primary={<Translate value={'tabs.dashboard'} />} />
                        </ListItem>
                        <Divider />
                        <ListItem className={this.isTabActive('/patients') ? classes.activeSidebarButton : classes.sidebarButton} button onClick={() => this.redirect("/patients")} key={'patients'} >
                            <ListItemIcon ><AssignmentIndIcon className={classes.backgrounColorText} /></ListItemIcon>
                            <ListItemText className={classes.backgrounColorText} primary={<Translate value='tabs.patients' />} />
                        </ListItem>
                        <ListItem className={this.isTabActive('/apointments') ? classes.activeSidebarButton : classes.sidebarButton} button onClick={() => this.redirect("/apointments")} key={'apointments'} >
                            <ListItemIcon ><TodayIcon className={classes.backgrounColorText} /></ListItemIcon>
                            <ListItemText className={classes.whiteText} primary={<Translate value={'tabs.apointments'} />} />
                        </ListItem>
                        <ListItem className={this.isTabActive('/pathologies') ? classes.activeSidebarButton : classes.sidebarButton} button onClick={() => this.redirect("/pathologies")} key={'pathologies'} >
                            <ListItemIcon ><LocalHospitalIcon className={classes.backgrounColorText} /></ListItemIcon>
                            <ListItemText className={classes.whiteText} primary={<Translate value={'tabs.pathologies'} />} />
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </div >
        );
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withRouter((withStyles(styles, { withTheme: true })(MiniDrawer)))