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
import DialogTitle from '@material-ui/core/DialogTitle';

import _ from 'lodash'

import { createPatient, updatePatient, deletePatient, getAllPatients, clearData, clearErrors, setShowPatientDialog } from './PatientActions'
import { Button, Paper, Typography } from '@material-ui/core';
import TableTitle from '../common/TableTitle';
import FormTitle from '../common/FormTitle';
import ConfirmationDialog from '../common/ConfirmationDialog.component';

const styles = PatientStyles;
const I18n = require('react-redux-i18n').I18n;
const NEW_PATIENT = "addPatient";
const EDIT_PATIENT = "editPatient";

class Patients extends React.Component {

    constructor(props) {
        super(props)
        this.props.getAllPatients()
        this.props.setShowPatientDialog(false)

        this.state = {
            dialogType: '',
            showDeleteDialog: false,
            selectedPacientId: '',
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

    componentWillUnmount() {
        this.props.clearData();
        this.props.clearErrors();
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    newPatient = () => {

        this.setState({
            dialogType: NEW_PATIENT,
            selectedPacientId: '',
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            errors: {}
        });
        this.props.setShowPatientDialog(true)
    }

    dialogClose = () => {

        this.props.setShowPatientDialog(false)

        this.setState({
            selectedPacientId: '',
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            errors: {}
        });

        this.props.clearErrors()
    }

    dialogSubmit = (e) => {
        e.preventDefault();

        const patient = {
            id: this.state.selectedPacientId,
            fullName: this.state.fullName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
        }

        if (this.state.dialogType === NEW_PATIENT) {
            this.props.createPatient(patient)
        } else if (this.state.dialogType === EDIT_PATIENT) {
            this.props.updatePatient(patient)
        }
    }

    editPatient = (row) => {

        this.setState({
            dialogType: EDIT_PATIENT,
            selectedPacientId: row.id,
            fullName: row.fullName,
            email: row.email,
            phoneNumber: row.phoneNumber,
            address: row.address,
            errors: {}
        });

        this.props.setShowPatientDialog(true)
    }

    deletePatientOpen = (id) => {

        this.setState({
            showDeleteDialog: true,
            selectedPacientId: id
        });
    }

    deletePatientClose = () => {
        this.setState({
            showDeleteDialog: false,
            selectedPacientId: ''
        });
    }

    deletePatientAccept = () => {

        this.props.deletePatient(this.state.selectedPacientId)

        this.setState({
            showDeleteDialog: false,
            selectedPacientId: ''
        });
    }

    render() {

        const { classes } = this.props;
        let { patientList, showPatientDialog } = this.props;
        const { errors } = this.state;

        if (!patientList.patients || !patientList.patients.length) {
            patientList.patients = []
        }

        if (showPatientDialog === undefined) {
            showPatientDialog = false
        }

        return (
            <div className={classes.root}>
                <TableTitle text='patients.patientList' />
                <MaterialTable
                    // title={<Typography variant='h5'><Translate value='patients.patientList' /></Typography>}
                    title=''
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
                    actions={
                        [
                            {
                                icon: 'edit',
                                tooltip: `${I18n.t('patients.editPatient')}`,
                                onClick: (event, row) => this.editPatient(row)
                            },
                            {
                                icon: 'delete',
                                tooltip: `${I18n.t('patients.deletePacient')}`,
                                onClick: (event, row) => this.deletePatientOpen(row.id)
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
                        },
                        body: {
                            emptyDataSourceMessage: `${I18n.t('table.emptyDataSourceMessage')}`
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

                <Dialog open={showPatientDialog} onClose={this.dialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{I18n.t(`patients.${this.state.dialogType}`)}</DialogTitle>
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
                        <Button onClick={this.dialogClose} color="primary">
                            {I18n.t('global.cancel')}
                        </Button>
                        <Button onClick={this.dialogSubmit} color="primary">
                            {I18n.t('global.submit')}
                        </Button>
                    </DialogActions>
                </Dialog>

                <ConfirmationDialog
                    open={this.state.showDeleteDialog}
                    handleClose={this.deletePatientClose}
                    handleAccept={this.deletePatientAccept}
                    title='patients.deletePacient'
                    text='patients.deletePacientConfirmation'
                />
            </div >
        )
    }
}

Patients.propTypes = {
    createPatient: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    patientList: state.patients.patientList,
    showPatientDialog: state.patients.showPatientDialog,
    errors: state.errors
})

const mapDispatchToProps = dispatch => bindActionCreators({ createPatient, updatePatient, deletePatient, getAllPatients, clearData, clearErrors, setShowPatientDialog }, dispatch)

export default AuthRequired(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Patients))))