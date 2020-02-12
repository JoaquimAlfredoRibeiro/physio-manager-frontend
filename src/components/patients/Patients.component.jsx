import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import { Translate } from 'react-redux-i18n'
import { withStyles } from '@material-ui/core/styles';

import PatientStyles from './Patients.styles'
import MaterialTable, { MTableHeader, MTableToolbar } from 'material-table';
import AuthRequired from '../common/AuthRequired'

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import _ from 'lodash'

import { createPatient, updatePatient, deletePatient, getAllPatients, clearData, clearErrors, setShowNewPatientState, setShowEditPatientState } from './PatientActions'
import { Button, Paper, Typography } from '@material-ui/core';
import TableTitle from '../common/TableTitle';
import appConstants from '../../appConstants'

const styles = PatientStyles;
const I18n = require('react-redux-i18n').I18n;

class Patients extends React.Component {

    constructor(props) {
        super(props)
        this.props.getAllPatients()

        this.state = {
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            errors: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.errors) {
            return {
                errors: props.errors
            }
        }

        return null;
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillUnmount() {
        this.props.clearData();
        this.props.clearErrors();
    }

    newPatient = () => {

        this.props.setShowNewPatientState(true)

        this.setState({
            fullName: 'asuqwd',
            email: 'buenastar@gmail.com',
            phoneNumber: '123123123',
            address: 'aiai la nas ruas',
            errors: ''
        });
    }

    newPatientClose = () => {

        this.props.setShowNewPatientState(false)

        this.setState({
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            errors: ''
        });

        this.props.clearErrors()
    }

    newPatientSubmit = (e) => {
        e.preventDefault();
        const patient = {
            fullName: this.state.fullName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
        }
        this.props.createPatient(patient)
    }

    // editPatient = (id) => {
    //     this.setState({ showEditPatient: true });
    // }

    // editPatientClose = () => {
    //     this.setState({ showEditPatient: false });
    // }

    render() {

        const { classes } = this.props;
        const { patientList, showNewPatient, showEditPatient } = this.props;
        const { errors } = this.state;

        if (!patientList.patients || !patientList.patients.length) {
            return null
        }

        return (
            <div className={classes.root}>
                {/* <TableTitle text='patients.patientList' /> */}
                <MaterialTable
                    title={<Typography variant='h5'><Translate value='patients.patientList' /></Typography>}
                    // components={{
                    //     Toolbar: props => (
                    //         <div style={{
                    //             backgroundColor: appConstants.PRIMARY_INFO_MAIN,
                    //             background: 'rgb(0,172,193)',
                    //             background: 'linear-gradient(90deg, rgba(0,172,193,1) 0%, rgba(0,172,193,1) 38%, rgba(14,135,149,1) 99%)',
                    //             borderRadius: '5px',
                    //             color: '#FFF',
                    //             margin: '0 0 15px',
                    //             boxShadow: '5px 5px 15px -5px rgba(0, 0, 0, 0.42)',
                    //         }}>
                    //             <MTableToolbar {...props} />
                    //         </div>
                    //     )
                    // }}
                    title={`${I18n.t('patients.patientList')}`}
                    columns={
                        [
                            { title: `${I18n.t('patients.fullName')}`, field: 'fullName' },
                            { title: `${I18n.t('patients.phoneNumber')}`, field: 'phoneNumber' },
                            { title: `${I18n.t('patients.email')}`, field: 'email' },
                            { title: `${I18n.t('patients.address')}`, field: 'address' },
                        ]}
                    data={
                        patientList.patients.map(row => (
                            { id: `${row.id}`, fullName: `${row.fullName}`, phoneNumber: `${row.phoneNumber}`, email: `${row.email}`, address: `${row.address}`, }
                        ))
                    }
                    // options={{
                    //     searchFieldStyle: {
                    //         color: '#FFF',
                    //     }
                    // }}
                    actions={
                        [
                            {
                                icon: 'edit',
                                tooltip: `${I18n.t('patients.editPatient')}`,
                                onClick: (event, row) => this.editPatient(row.id)
                            }
                        ]}
                    localization={{
                        pagination: {
                            labelDisplayedRows: `${I18n.t('table.displayedRows')}`,
                            labelRowsSelect: `${I18n.t('table.rows')}`,
                            firstTooltip: `${I18n.t('table.firstPage')}`,
                            previousTooltip: `${I18n.t('table.previousPage')}`,
                            lastTooltip: `${I18n.t('table.lastPage')}`,
                            nextTooltip: `${I18n.t('table.nextPage')}`,
                        },
                        header: {
                            actions: `${I18n.t('table.actions')}`
                        },
                        toolbar: {
                            searchPlaceholder: `${I18n.t('table.search')}`
                        }
                    }
                    }
                >
                </MaterialTable >
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<PersonAddIcon />}
                    onClick={() => this.newPatient()}
                >
                    <Translate value='patients.addPatient' />
                </Button>
                <Dialog open={showNewPatient} onClose={this.newPatientClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{I18n.t('patients.addPatient')}</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label={<Translate value='patients.fullName' />}
                            name="fullName"
                            autoComplete="fullName"
                            autoFocus
                            onChange={this.handleInputChange}
                            value={this.state.fullName}
                            error={Boolean(`${_.get(errors, ['fields', 'fullName'], '')}`)}
                            helperText={I18n.t(`patientProfileValidation.${_.get(errors, ['fields', 'fullName'], '')}`)}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label={<Translate value='patients.email' />}
                            type="email"
                            id="email"
                            autoComplete="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                            error={Boolean(`${_.get(errors, ['fields', 'email'], '')}`)}
                            helperText={I18n.t(`patientProfileValidation.${_.get(errors, ['fields', 'email'], '')}`)}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            type='number'
                            id="phoneNumber"
                            label={<Translate value='patients.phoneNumber' />}
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                            onChange={this.handleInputChange}
                            value={this.state.phoneNumber}
                            error={Boolean(`${_.get(errors, ['fields', 'phoneNumber'], '')}`)}
                            helperText={I18n.t(`patientProfileValidation.${_.get(errors, ['fields', 'phoneNumber'], '')}`)}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            id="address"
                            label={<Translate value='patients.address' />}
                            name="address"
                            autoComplete="address"
                            onChange={this.handleInputChange}
                            value={this.state.address}
                            error={Boolean(`${_.get(errors, ['fields', 'address'], '')}`)}
                            helperText={I18n.t(`patientProfileValidation.${_.get(errors, ['fields', 'address'], '')}`)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.newPatientClose} color="primary">
                            {I18n.t('global.cancel')}
                        </Button>
                        <Button onClick={this.newPatientSubmit} color="primary">
                            {I18n.t('global.submit')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}

Patients.propTypes = {
    createPatient: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    patientList: state.patients.patientList,
    showNewPatient: state.patients.showNewPatient,
    errors: state.errors
})

const mapDispatchToProps = dispatch => bindActionCreators({ createPatient, updatePatient, deletePatient, getAllPatients, clearData, clearErrors, setShowNewPatientState, setShowEditPatientState }, dispatch)

export default AuthRequired(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Patients))))