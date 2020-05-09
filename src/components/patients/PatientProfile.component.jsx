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

import _ from 'lodash'

import {
    getPatientInfo,
    setShowAddPathologyDialog
} from './PatientActions'
import {
    Button,
    Grid,
    Paper,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Checkbox,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Input
} from '@material-ui/core';
import CardTitle from '../common/CardTitle';
import TextFieldDisplay from '../common/TextFieldDisplay';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import Visibility from '@material-ui/icons/Visibility';



const styles = PatientProfileStyles;
const I18n = require('react-redux-i18n').I18n;

class PatientProfile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            pathologies: [{ id: 1, name: "Knee Injury" }, { id: 2, name: "Elbow Injury" }],
            allPathologies: [{ id: 3, name: "Arm Injury" }, { id: 4, name: "Head Injury" }, { id: 5, name: "Leg Injury" }],
            treatments: [{ id: 1, startDate: "05-08-2020 14:00", treatment: "Tratamento tal, após identificar a maleita coiso" }, { id: 1, startDate: "05-09-2020 14:00", treatment: "Foi chegar, ver e vencer" }, { id: 1, startDate: "05-10-2020 14:00", treatment: "Consulta de manutenção" }],
            pathologyFilter: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.selectedPatient) {
            props.getPatientInfo(props.selectedPatient)
        }
        return null;
    }

    addPathology = () => {
        this.props.setShowAddPathologyDialog(true)
    }

    dialogClose = () => {
        this.props.setShowAddPathologyDialog(false)
    }

    dialogSubmit = (e) => {
        e.preventDefault();
    }

    handleChangeFilter = (e) => {
        this.setState({
            pathologyFilter: e.target.valueue
        })
    }

    handleFilterClear = (e) => {
        e.preventDefault();
    }

    editTreatment = (e) => {
        e.preventDefault();
    }

    render() {

        const { classes } = this.props;

        console.log(this.props)

        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card style={{
                                boxShadow: '0 10px 35px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                                marginTop: '-35px'
                            }}>
                                <CardMedia
                                    style={{
                                        height: 250
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
                    <Grid item xs={6}>
                        <Paper className={classes.tablePaper}>
                            <CardTitle marginTop='-19px' marginLeft='16px' text='tabs.appointments' />
                            <MaterialTable
                                title=''
                                columns={
                                    [
                                        { title: `${I18n.t('global.startDate')}`, field: 'startDate' },
                                        { title: `${I18n.t('global.location')}`, field: 'location' },
                                        { title: `${I18n.t('global.notes')}`, field: 'notes' }
                                    ]}
                                data={
                                    [
                                        { startDate: '05-08-2020 14:00', location: 'Casa Paciente', notes: 'Excelente tratamento' },
                                        { startDate: '05-09-2020 14:00', location: 'Casa Paciente', notes: 'Tratamento de excelência' },
                                        { startDate: '05-10-2020 14:00', location: 'Casa Paciente', notes: 'Tratamento de alta qualidade' }
                                    ]
                                    // patientList.patients.map(row => (
                                    //     { id: `${row.id}`, fullName: `${row.fullName}`, phoneNumber: `${row.phoneNumber}`, email: `${row.email}`, address: `${row.address}`, }
                                    // ))
                                }
                                options={{
                                    search: false
                                }}
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
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <CardTitle marginTop='-35px' text='tabs.pathologies' />
                            <List className={classes.listspacing}>

                                {this.state.pathologies.map(pathology => {
                                    return (
                                        <ListItem key={pathology.id}>
                                            <ListItemText primary={pathology.name} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                })}
                            </List>
                            <div>
                                <Fab
                                    color="secondary"
                                    size='small'
                                    className={classes.addButton}
                                    onClick={() => this.addPathology()}
                                >
                                    <AddIcon />
                                </Fab>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container className={classes.topspacing} spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.tablePaper}>
                            <CardTitle marginTop='-19px' marginLeft='16px' text='patients.treatmentHistory' />
                            <MaterialTable
                                title=''
                                columns={
                                    [
                                        {
                                            title: `${I18n.t('global.startDate')}`, field: 'startDate', width: 200
                                        },
                                        {
                                            title: `${I18n.t('global.treatment')}`, field: 'treatment'
                                        },
                                    ]}
                                data={
                                    this.state.treatments.map(row => (
                                        { id: `${row.id}`, startDate: `${row.startDate}`, treatment: `${row.treatment}` }
                                    ))
                                }
                                actions={
                                    [
                                        {
                                            icon: 'edit',
                                            tooltip: `${I18n.t('patients.editTreatment')}`,
                                            onClick: (event, row) => this.editTreatment(row)
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
                        </Paper>
                    </Grid>
                </Grid>

                <Dialog open={this.props.showAddPathologyDialog} onClose={this.dialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{I18n.t('patients.addPathologies')}</DialogTitle>
                    <DialogContent style={{ width: "300px", marginTop: '-10px' }}>

                        <FormControl className={classes.form}>
                            <InputLabel htmlFor="standard-adornment">
                                Filter
                            </InputLabel>
                            <Input
                                id="standard"
                                type="text"
                                default='Filter'
                                value={this.state.pathologyFilter}
                                onChange={this.handleChangeFilter}
                                endAdornment={
                                    <InputAdornment position="end" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleFilterClear}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <List >
                            {this.state.allPathologies.map(pathology => {
                                return (
                                    <ListItem key={pathology.id} button>
                                        <ListItemText id={pathology.id} primary={pathology.name} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                // onChange={handleToggle(pathology.id)}
                                                // checked={checked.indexOf(pathology.id) !== -1}
                                                inputProps={{ "aria-labelledby": pathology.id }}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })}
                        </List>
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
    showAddPathologyDialog: state.patients.showAddPathologyDialog,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getPatientInfo,
    setShowAddPathologyDialog
}, dispatch)

export default AuthRequired(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PatientProfile))))