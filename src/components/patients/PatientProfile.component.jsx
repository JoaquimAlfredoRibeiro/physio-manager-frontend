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
    Input,
    Card,
    CardMedia,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    IconButton,
    Fab
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import CardTitle from '../common/CardTitle';
import TextFieldDisplay from '../common/TextFieldDisplay';

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';



const styles = PatientProfileStyles;
const I18n = require('react-redux-i18n').I18n;

class PatientProfile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            fullName: '',
            email: '',
            address: '',
            phoneNumber: '',
            pathologies: [{ id: 1, name: "Knee Injury" }, { id: 2, name: "Elbow Injury" }],
            allPathologies: [{ id: 3, name: "Arm Injury" }, { id: 4, name: "Head Injury" }, { id: 5, name: "Leg Injury" }],
            treatments: [{ id: 1, startDate: "05/08/2020", treatment: "Tratamento tal, após identificar a maleita coiso" }, { id: 1, startDate: "05/09/2020", treatment: "Foi chegar, ver e vencer" }, { id: 1, startDate: "05/10/2020", treatment: "Consulta de manutenção" }],
            pathologyFilter: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.selectedPatient && props.selectedPatient > 0 && props.selectedPatient != state.id) {
            props.getPatientInfo(props.selectedPatient)
        }

        if (props.patientInfo && props.patientInfo.id !== state.id) {
            return {
                id: props.patientInfo.id,
                fullName: props.patientInfo.fullName,
                email: props.patientInfo.email,
                address: props.patientInfo.address,
                phoneNumber: props.patientInfo.phoneNumber,
            }
        }

        return null;
    }

    getPhoto = () => {
        switch (this.state.id) {
            case 13:
                return 'https://media.istockphoto.com/photos/mature-mixed-race-man-smiling-picture-id825083248?k=6&m=825083248&s=612x612&w=0&h=5INx9_oQUM2euqhKmMWdpbLHu2ET2AcZ8cAj1_IdxWk='
                break;
            case 14:
                return 'https://fixthephoto.com/blog/UserFiles/self-portrait-photography-free-photoshop-action-smooth-skin-before.jpg'
                break;
            case 17:
                return 'https://image.freepik.com/free-photo/beautiful-african-american-woman-face-smiling_33839-3491.jpg'
                break;
            case 19:
                return 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg'
                break;
            case 20:
                return 'https://image.freepik.com/free-photo/young-asian-girl-portrait-isolated_53876-70968.jpg'
                break;
            default:
                return ''
                break;
        }
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

        console.log('render me timbers')

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
                                    image={this.getPhoto()}
                                    title="Contemplative Reptile"
                                />
                            </Card>
                            <TextFieldDisplay marginTop='20px' label="patients.fullName" value={this.state.fullName} />
                            <TextFieldDisplay marginTop='5px' label="patients.phoneNumber" value={this.state.phoneNumber} />
                            <TextFieldDisplay marginTop='5px' label="patients.email" value={this.state.email} />
                            <TextFieldDisplay marginTop='5px' label="patients.address" value={this.state.address} />
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
                                title=""
                                columns={[
                                    {
                                        title: I18n.t('global.startDate'), field: 'startDate', width: 180,
                                        editComponent: props => (
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    format="dd/MM/yyyy"
                                                    value={props.value}
                                                    onChange={e => props.onChange(e)}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        )
                                    },
                                    {
                                        title: I18n.t('global.treatment'), field: 'treatment', editComponent: props => (
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                id="treatment"
                                                name="treatment"
                                                value={props.value}
                                                onChange={e => props.onChange(e.target.value)}
                                            />
                                        )
                                    }
                                ]}
                                data={this.state.treatments}
                                editable={{
                                    onRowAdd: newData =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                {
                                                    const data = this.state.treatments;
                                                    data.push(newData);
                                                    this.setState({ data }, () => resolve());
                                                }
                                                resolve()
                                            }, 1000)
                                        }),
                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                {
                                                    const data = this.state.treatments;
                                                    const index = data.indexOf(oldData);
                                                    console.log(data[index])
                                                    console.log(newData)
                                                    data[index] = newData;
                                                    this.setState({ data }, () => resolve());
                                                }
                                                resolve()
                                            }, 1000)
                                        }),
                                    onRowDelete: oldData =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                {
                                                    let data = this.state.treatments;
                                                    const index = data.indexOf(oldData);
                                                    data.splice(index, 1);
                                                    this.setState({ data }, () => resolve());
                                                }
                                                resolve()
                                            }, 1000)
                                        }),
                                }}
                            />
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