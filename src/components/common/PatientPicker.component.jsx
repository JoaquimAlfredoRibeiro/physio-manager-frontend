import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getAllPatients } from '../patients/PatientActions'

const I18n = require('react-redux-i18n').I18n;

class PacientPicker extends React.Component {

    constructor(props) {
        super(props)

        this.props.getAllPatients()
    }


    render() {
        const { patientList } = this.props

        return (
            <Autocomplete
                id="patientPicker"
                options={patientList.patients}
                getOptionLabel={option => option.fullName}
                style={{ width: this.props.width }}
                onChange={this.props.onChange}
                renderInput={params => (
                    <TextField {...params} label={`${I18n.t('appointments.patientPicker')}`} variant="outlined" fullWidth />
                )}
            />
        )
    }
}

const mapStateToProps = state => ({
    patientList: state.patients.patientList,
})

const mapDispatchToProps = dispatch => bindActionCreators({ getAllPatients }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PacientPicker)