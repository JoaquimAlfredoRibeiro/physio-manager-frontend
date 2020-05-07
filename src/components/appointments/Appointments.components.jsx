import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import { Translate } from 'react-redux-i18n'
import { withStyles } from '@material-ui/core/styles';

import AppointmentStyles from './Appointments.styles'
import AuthRequired from '../common/AuthRequired'

import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
    Toolbar,
    ViewSwitcher,
    DragDropProvider,
    DateNavigator,
    TodayButton,
    CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import _ from 'lodash'

import { connectProps } from '@devexpress/dx-react-core';

import CustomAppointmentForm from './CustomAppointmentForm.component'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
import PacientPickerComponent from '../common/PatientPicker.component';

import { getAllAppointments, createAppointment } from './AppointmentsActions'
import { mockComponent } from 'react-dom/test-utils';

const styles = AppointmentStyles;
const I18n = require('react-redux-i18n').I18n;

const appointmentsList = [{
    title: "Website Re-Design Plan",
    startDate: new Date(2020, 2, 13, 9, 30),
    endDate: new Date(2020, 2, 13, 11, 30),
    id: 0,
    location: "Room 1"
},
{
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2020, 2, 13, 12, 0),
    endDate: new Date(2020, 2, 13, 15, 0),
    id: 1,
    location: "Room 1"
}]

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

class AppointmentsComp extends React.Component {

    constructor(props) {
        super(props);

        let today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const appointmentsLists = this.props.getAllAppointments()

        this.state = {
            data: appointmentsList,
            currentDate: date,
            confirmationVisible: false,
            editingFormVisible: false,
            deletedAppointmentId: undefined,
            editingAppointment: undefined,
            previousAppointment: undefined,
            addedAppointment: {},
            isNewAppointment: false,
        };

        this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
        this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
        this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

        this.commitChanges = this.commitChanges.bind(this);
        this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
        this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);

        this.appointmentForm = connectProps(CustomAppointmentForm, () => {
            const {
                editingFormVisible,
                editingAppointment,
                data,
                addedAppointment,
                isNewAppointment,
                previousAppointment
            } = this.state;

            const currentAppointment = data
                .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
                || addedAppointment;
            const cancelAppointment = () => {
                if (isNewAppointment) {
                    this.setState({
                        editingAppointment: previousAppointment,
                        isNewAppointment: false,
                    });
                }
            };

            return {
                visible: editingFormVisible,
                appointmentData: currentAppointment,
                commitChanges: this.commitChanges,
                visibleChange: this.toggleEditingFormVisibility,
                onEditingAppointmentChange: this.onEditingAppointmentChange,
                cancelAppointment,
            };
        });
    }

    componentDidUpdate() {
        this.appointmentForm.update();
    }

    onEditingAppointmentChange(editingAppointment) {
        this.setState({ editingAppointment });
    }

    onAddedAppointmentChange(addedAppointment) {
        this.setState({ addedAppointment });
        const { editingAppointment } = this.state;
        if (editingAppointment !== undefined) {
            this.setState({
                previousAppointment: editingAppointment,
            });
        }
        this.setState({ editingAppointment: undefined, isNewAppointment: true });
    }

    setDeletedAppointmentId(id) {
        this.setState({ deletedAppointmentId: id });
    }

    toggleEditingFormVisibility() {
        const { editingFormVisible } = this.state;
        this.setState({
            editingFormVisible: !editingFormVisible,
        });
    }

    toggleConfirmationVisible() {
        const { confirmationVisible } = this.state;
        this.setState({ confirmationVisible: !confirmationVisible });
    }

    commitDeletedAppointment() {
        this.setState((state) => {
            const { data, deletedAppointmentId } = state;
            const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

            return { data: nextData, deletedAppointmentId: null };
        });
        this.toggleConfirmationVisible();
    }

    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                console.log("ADDING APPOINTMENT")
                console.log(added)

                const modifiedAdded = this.modifyAdded(added)

                console.log("MODIFIED APPOINTMENT")
                console.log(modifiedAdded)

                this.props.createAppointment(modifiedAdded)

                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                this.setDeletedAppointmentId(deleted);
                this.toggleConfirmationVisible();
            }
            return { data, addedAppointment: {} };
        });
    }

    modifyAdded(added) {
        return {
            ...added,
            startDate: '2019-03-11T10:08:28.097832',
            endDate: '2019-03-11T11:08:28.097832'
        }
    }

    render() {
        const { currentDate,
            data,
            confirmationVisible,
            editingFormVisible } = this.state;
        const { classes, locale } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <Paper>
                    <Scheduler
                        data={data}
                        maxHeight={630}
                        locale={locale}
                    >
                        <ViewState
                            defaultCurrentDate={currentDate}
                            defaultCurrentViewName="Week"
                        />
                        <EditingState
                            onCommitChanges={this.commitChanges}
                            onEditingAppointmentChange={this.onEditingAppointmentChange}
                            onAddedAppointmentChange={this.onAddedAppointmentChange}
                        />
                        <IntegratedEditing />
                        <Toolbar />
                        <DateNavigator />
                        <TodayButton messages={{ today: `${I18n.t('calendar.today')}` }} />
                        <DayView
                            cellDuration={60}
                            startDayHour={9}
                            endDayHour={19}
                            displayName={`${I18n.t('calendar.day')}`}
                        />
                        <WeekView
                            cellDuration={60}
                            startDayHour={9}
                            endDayHour={19}
                            displayName={`${I18n.t('calendar.week')}`}
                        />
                        <MonthView
                            displayName={`${I18n.t('calendar.month')}`} />
                        <ConfirmationDialog />
                        <Appointments />
                        <AppointmentTooltip
                            showOpenButton
                            showCloseButton
                        // showDeleteButton
                        />
                        <AppointmentForm
                            overlayComponent={this.appointmentForm}
                            visible={editingFormVisible}
                            onVisibilityChange={this.toggleEditingFormVisibility}
                        />
                        <DragDropProvider />
                        <ViewSwitcher />
                        <CurrentTimeIndicator
                            shadePreviousCells={true}
                            shadePreviousAppointments={true}
                            updateInterval={1800000}
                        />
                    </Scheduler>

                    <Dialog
                        open={confirmationVisible}
                        onClose={this.cancelDelete}
                    >
                        <DialogTitle>
                            {I18n.t('appointments.deleteAppointment')}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {I18n.t('appointments.deleteConfirmation')}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                                {I18n.t('global.cancel')}
                            </Button>
                            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                                {I18n.t('global.delete')}
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Fab
                        color="secondary"
                        className={classes.addButton}
                        onClick={() => {
                            this.setState({ editingFormVisible: true });
                            this.onEditingAppointmentChange(undefined);
                            this.onAddedAppointmentChange({
                                startDate: new Date(currentDate).setHours(9),
                                endDate: new Date(currentDate).setHours(10),
                            });
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </Paper>
            </MuiThemeProvider>
        );
    }
}


const mapStateToProps = state => ({
    locale: state.i18n.locale,
    appointmentsList: state.appointments.appointmentsList,
    // errors: state.errors
})

const mapDispatchToProps = dispatch => bindActionCreators({ getAllAppointments, createAppointment }, dispatch)

export default AuthRequired(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(AppointmentsComp))))