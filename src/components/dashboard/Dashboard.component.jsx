import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

import { Translate } from 'react-redux-i18n'
import AuthRequired from '../common/AuthRequired'

import TableTitle from '../common/TableTitle'

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import AppointmentCard from './AppointmentCard'
import { setSelectedPatient } from '../patients/PatientActions'

import DashboardStyles from './Dashboard.styles'
const styles = DashboardStyles;

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            appointments: [
                { id: '14', fullName: 'asd', startTime: '01:00', location: 'Rua do coiso', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
                { id: '2', fullName: 'asd', startTime: '02:00', location: 'Rua do coiso', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
                { id: '3', fullName: 'asd', startTime: '03:00', location: 'Rua do coiso', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
                { id: '4', fullName: 'asd', startTime: '04:00', location: 'Rua do coiso', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
                { id: '5', fullName: 'asd', startTime: '05:00', location: 'Rua do coiso', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
                { id: '6', fullName: 'asd', startTime: '06:00', location: 'Rua do coiso', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
                { id: '7', fullName: 'asd', startTime: '07:00', location: 'Rua do coiso', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
                { id: '8', fullName: 'asd', startTime: '08:00', location: 'Rua do coiso', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
                { id: '9', fullName: 'asd', startTime: '09:00', location: 'Rua do coiso', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
                { id: '10', fullName: 'asd', startTime: '10:00', location: 'Rua do coiso', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
            ],
        }
    }

    onAppointmentClick = (id) => {
        this.props.setSelectedPatient(id)
        this.props.history.push('/patientprofile');
    }

    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TableTitle text='dashboard.todaysAppointments' />
                <div className={classes.grid}>
                    <Grid container spacing={2} className={classes.innerGrid}>
                        {this.state.appointments.map(appoint =>
                            <Grid key={appoint.id} itemxs={12} sm={6} md={4} lg={3} xl={3} className={classes.rowGrid}>
                                <AppointmentCard
                                    key={appoint.id}
                                    id={appoint.id}
                                    fullName={appoint.fullName}
                                    startTime={appoint.startTime}
                                    location={appoint.location}
                                    img={appoint.img}
                                    onClick={e => this.onAppointmentClick(e)}
                                />
                            </Grid>)}
                    </Grid>

                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    // patientList: state.patients.patientList
})

const mapDispatchToProps = dispatch => bindActionCreators({ setSelectedPatient }, dispatch)

export default AuthRequired(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Dashboard))))