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
                { id: '13', fullName: 'Luis de Camarõess', startTime: '10:00', location: 'Barraca 74, 1548-585 Praia da Barrouca', img: 'https://media.istockphoto.com/photos/mature-mixed-race-man-smiling-picture-id825083248?k=6&m=825083248&s=612x612&w=0&h=5INx9_oQUM2euqhKmMWdpbLHu2ET2AcZ8cAj1_IdxWk=' },
                { id: '14', fullName: 'Cristina Maria Filipa Ferreiras', startTime: '11:00', location: 'Rua dos Pinheiros Velhos 12, 2000-200 Pinheiral Bravio', img: 'https://fixthephoto.com/blog/UserFiles/self-portrait-photography-free-photoshop-action-smooth-skin-before.jpg' },
                { id: '17', fullName: 'Mariana Maria Ana Antunes', startTime: '14:30', location: 'Rua da Caneta 2º Esquerdo,  4575-828  Porto', img: 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg' },
                { id: '19', fullName: 'Mário António', startTime: '16:00', location: 'Rua da Estrela 3º F, 1234-452 Reino do Cogumelo', img: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg' },
                { id: '20', fullName: 'Joana Manuela', startTime: '17:30', location: 'Rua da Universidade 77, 4785-302 Aveiro', img: 'https://image.freepik.com/free-photo/young-asian-girl-portrait-isolated_53876-70968.jpg' },
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