import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import { Translate } from 'react-redux-i18n'
import { withStyles } from '@material-ui/core/styles';

import ApointmentStyles from './Apointments.styles'
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

const styles = ApointmentStyles;
const I18n = require('react-redux-i18n').I18n;

const appointments = [{
    title: "Website Re-Design Plan",
    startDate: new Date(2020, 1, 15, 9, 30),
    endDate: new Date(2020, 1, 15, 11, 30),
    id: 0,
    location: "Room 1"
},
{
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2020, 1, 15, 12, 0),
    endDate: new Date(2020, 1, 15, 15, 0),
    id: 1,
    location: "Room 1"
}]

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

class Apointments extends React.Component {

    constructor(props) {
        super(props);

        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            data: appointments,
            currentDate: date,
        };

        this.commitChanges = this.commitChanges.bind(this);
    }

    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
    }

    render() {
        const { currentDate, data } = this.state;
        const { locale } = this.props;

        console.log(locale)

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
                            showDeleteButton
                        />
                        <AppointmentForm />
                        <DragDropProvider />
                        <ViewSwitcher />
                        <CurrentTimeIndicator
                            shadePreviousCells={true}
                            shadePreviousAppointments={true}
                            updateInterval={1800000}
                        />
                    </Scheduler>
                </Paper>
            </MuiThemeProvider>
        );
    }
}


const mapStateToProps = state => ({
    locale: state.i18n.locale,
    // showPathologyDialog: state.pathologies.showPathologyDialog,
    // errors: state.errors
})

// const mapDispatchToProps = dispatch => bindActionCreators({ createPathology, updatePathology, deletePathology, getAllPathologies, clearData, clearErrors, setShowPathologyDialog }, dispatch)

export default AuthRequired(withRouter(connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(Apointments))))