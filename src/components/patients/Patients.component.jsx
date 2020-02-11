import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Translate } from 'react-redux-i18n'
import { withStyles } from '@material-ui/core/styles';

import PatientStyles from './Patients.styles'
import MaterialTable from 'material-table';
import AuthRequired from '../common/AuthRequired'

import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { getAllPatients, clearData } from './PatientActions'
import { Button, Paper } from '@material-ui/core';
import TableTitle from '../common/TableTitle';

const styles = PatientStyles;
const I18n = require('react-redux-i18n').I18n;

class Patients extends React.Component {

    constructor(props) {
        super(props)
        this.props.getAllPatients()
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    render() {

        const { classes } = this.props;
        const { patientList } = this.props

        if (!patientList.patients || !patientList.patients.length) {
            return null
        }

        return (
            <div className={classes.root}>
                <TableTitle text='patients.patientList' />
                <MaterialTable
                    title=''
                    columns={[
                        { title: `${I18n.t('patients.fullName')}`, field: 'fullName' },
                        { title: `${I18n.t('patients.phoneNumber')}`, field: 'phoneNumber' },
                        { title: `${I18n.t('patients.email')}`, field: 'email' },
                        { title: `${I18n.t('patients.address')}`, field: 'address' },
                    ]}
                    data={
                        patientList.patients.map(row => (
                            { fullName: `${row.fullName}`, phoneNumber: `${row.phoneNumber}`, email: `${row.email}`, address: `${row.address}`, }
                        ))
                    }
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: `${I18n.t('patients.editPatient')}`,
                            onClick: (event, rowData) => alert("Gogogogo alpha team " + rowData.name)
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
                    }}
                >
                </MaterialTable>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<PersonAddIcon />}
                >
                    <Translate value='patients.addPatient' />
                </Button>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    patientList: state.patients.patientList
})

const mapDispatchToProps = dispatch => bindActionCreators({ getAllPatients, clearData }, dispatch)

export default AuthRequired(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Patients)))