import * as React from 'react';
import {
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import AppointmentFormStyles from './CustomAppointmentForm.styles'

import PatientPicker from '../common/PatientPicker.component'

const I18n = require('react-redux-i18n').I18n;

const styles = AppointmentFormStyles;

class CustomAppointmentForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            appointmentChanges: {},
        };

        this.getAppointmentData = () => {
            const { appointmentData } = this.props;
            return appointmentData;
        };
        this.getAppointmentChanges = () => {
            const { appointmentChanges } = this.state;
            return appointmentChanges;
        };

        this.changeAppointment = this.changeAppointment.bind(this);
        this.commitAppointment = this.commitAppointment.bind(this);
    }

    changeAppointment({ field, changes }) {
        const nextChanges = {
            ...this.getAppointmentChanges(),
            [field]: changes,
        };
        this.setState({
            appointmentChanges: nextChanges,
        });
    }

    commitAppointment(type) {
        const { commitChanges } = this.props;
        const appointment = {
            ...this.getAppointmentData(),
            ...this.getAppointmentChanges(),
        };
        if (type === 'deleted') {
            commitChanges({ [type]: appointment.id });
        } else if (type === 'changed') {
            commitChanges({ [type]: { [appointment.id]: appointment } });
        } else {
            commitChanges({ [type]: appointment });
        }
        this.setState({
            appointmentChanges: {},
        });
    }

    render() {
        const {
            classes,
            visible,
            visibleChange,
            appointmentData,
            cancelAppointment,
            target,
            onHide,
        } = this.props;
        const { appointmentChanges } = this.state;

        const displayAppointmentData = {
            ...appointmentData,
            ...appointmentChanges,
        };

        const isNewAppointment = appointmentData.id === undefined;
        const applyChanges = isNewAppointment
            ? () => this.commitAppointment('added')
            : () => this.commitAppointment('changed');

        const textEditorProps = field => ({
            variant: 'outlined',
            onChange: ({ target: change }) => this.changeAppointment({
                field: [field], changes: change.value,
            }),
            value: displayAppointmentData[field] || '',
            label: I18n.t(`global.${field}`),
            className: classes.textField,
        });

        const pickerEditorProps = field => ({
            className: classes.picker,
            ampm: false,
            value: displayAppointmentData[field],
            onChange: date => this.changeAppointment({
                field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
            }),
            inputVariant: 'outlined',
            format: 'DD/MM/YYYY HH:mm',
            onError: () => null,
        });

        const cancelChanges = () => {
            this.setState({
                appointmentChanges: {},
            });
            visibleChange();
            cancelAppointment();
        };

        const onPatientChange = (event, value) => {
            this.changeAppointment({
                field: 'patient', changes: value
            })
        }

        return (
            <AppointmentForm.Overlay
                visible={true}
                visible={visible}
                target={target}
                fullSize={false}
                onHide={onHide}
            >
                <div>
                    <div className={classes.header}>
                        <IconButton
                            className={classes.closeButton}
                            onClick={cancelChanges}
                        >
                            <Close color="action" />
                        </IconButton>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.wrapper}>
                            <AssignmentIndIcon className={classes.icon} color="action" />
                            <PatientPicker width={'100%'} onChange={onPatientChange} />
                        </div>
                        <div className={classes.wrapper}>
                            <CalendarToday className={classes.icon} color="action" />
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDateTimePicker
                                    label={`${I18n.t('global.startDate')}`}
                                    {...pickerEditorProps('startDate')}
                                />
                                <KeyboardDateTimePicker
                                    label={`${I18n.t('global.endDate')}`}
                                    {...pickerEditorProps('endDate')}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className={classes.wrapper}>
                            <LocationOn className={classes.icon} color="action" />
                            <TextField
                                {...textEditorProps('location')}
                            />
                        </div>
                        <div className={classes.wrapper}>
                            <Notes className={classes.icon} color="action" />
                            <TextField
                                {...textEditorProps('notes')}
                                multiline
                                rows="6"
                            />
                        </div>
                    </div>
                    <div className={classes.buttonGroup}>
                        {!isNewAppointment && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.button}
                                onClick={() => {
                                    visibleChange();
                                    this.commitAppointment('deleted');
                                }}
                            >
                                {I18n.t('global.delete')}
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                visibleChange();
                                applyChanges();
                            }}
                        >
                            {isNewAppointment ? `${I18n.t('global.create')}` : `${I18n.t('global.save')}`}
                        </Button>
                    </div>
                </div>
            </AppointmentForm.Overlay>
        );
    }
}

export default CustomAppointmentForm = withStyles(styles, { name: 'AppointmentFormContainer' })(CustomAppointmentForm);