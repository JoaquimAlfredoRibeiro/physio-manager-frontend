import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import { Translate } from 'react-redux-i18n'
import { withStyles } from '@material-ui/core/styles';

import PatientProfileStyles from './PatientProfile.styles'
import MaterialTable, { MTableHeader, MTableToolbar } from 'material-table';
import AuthRequired from '../common/AuthRequired'

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import _ from 'lodash'

import { getPatientInfo } from './PatientActions'
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import CardTitle from '../common/CardTitle';
import TextFieldDisplay from '../common/TextFieldDisplay';
import ConfirmationDialog from '../common/ConfirmationDialog.component';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const styles = PatientProfileStyles;
const I18n = require('react-redux-i18n').I18n;

class PatientProfile extends React.Component {

    static getDerivedStateFromProps(props, state) {
        if (props.selectedPatient) {
            props.getPatientInfo(props.selectedPatient)
        }
        return null;
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Card style={{
                                boxShadow: '0 10px 35px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                                marginTop: '-35px'
                            }}>
                                <CardMedia
                                    style={{
                                        height: 300
                                    }}
                                    image="https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg"
                                    title="Contemplative Reptile"
                                />
                            </Card>
                            <TextFieldDisplay marginTop='20px' label="patients.fullName" value="João Manuel Silva" />
                            <TextFieldDisplay marginTop='5px' label="patients.phoneNumber" value="912370701" />
                            <TextFieldDisplay marginTop='5px' label="patients.email" value="myemail@gmail.com" />
                            <TextFieldDisplay marginTop='5px' label="patients.address" value="Rua das biscainhas 123 4150 Porto" />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <CardTitle text='tabs.pathologies' />
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <CardTitle text='tabs.appointments' />
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container className={classes.topspacing} spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <CardTitle text='patients.treatmentHistory' />
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>aasdasdasdasdsdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                            <div>asdasd</div>
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

PatientProfile.propTypes = {
    createPatient: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    patientInfo: state.patients.patientInfo,
    selectedPatient: state.patients.selectedPatient,
})

const mapDispatchToProps = dispatch => bindActionCreators({ getPatientInfo }, dispatch)

export default AuthRequired(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PatientProfile))))