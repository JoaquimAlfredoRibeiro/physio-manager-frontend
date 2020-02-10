import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Translate } from 'react-redux-i18n'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';

import AuthRequired from '../common/AuthRequired'

import { getAllPatients, clearData } from './PatientActions'
import { Button } from '@material-ui/core';

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

        const { patientList } = this.props
        var teste = I18n.t('patients.fullName');

        if (!patientList.patients || !patientList.patients.length) {
            return null
        }

        return (
            <div>
                {/* <h6>Table 1</h6>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Translate value={'patients.id'} /></TableCell>
                                <TableCell><Translate value={'patients.phoneNumber'} /></TableCell>
                                <TableCell><Translate value={'patients.fullName'} /></TableCell>
                                <TableCell><Translate value={'patients.email'} /></TableCell>
                                <TableCell><Translate value={'patients.address'} /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patientList.patients.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{row.fullName}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}

                <h6>Table 2</h6>
                <MaterialTable
                    title={I18n.t('patients.patientList')}
                    columns={[
                        // { title: `${I18n.t('patients.id')}`, field: 'id' },
                        { title: `${I18n.t('patients.fullName')}`, field: 'fullName' },
                        { title: `${I18n.t('patients.phoneNumber')}`, field: 'phoneNumber' },
                        { title: `${I18n.t('patients.email')}`, field: 'email' },
                        { title: `${I18n.t('patients.address')}`, field: 'address' },
                    ]}
                    data={
                        patientList.patients.map(row => (
                            { /*id: `${row.id}`,*/ fullName: `${row.fullName}`, phoneNumber: `${row.phoneNumber}`, email: `${row.email}`, address: `${row.address}`, }
                        ))
                    }
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                    ]}
                >
                    <Button>ASD</Button>
                </MaterialTable>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    patientList: state.patients.patientList
})

const mapDispatchToProps = dispatch => bindActionCreators({ getAllPatients, clearData }, dispatch)

export default AuthRequired(connect(mapStateToProps, mapDispatchToProps)(Patients))