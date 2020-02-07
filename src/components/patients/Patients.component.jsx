import React, { Component } from 'react'
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

import AuthRequired from '../common/AuthRequired'

import { getAllPatients, clearData } from './PatientActions'

class Patients extends Component {

    constructor(props) {
        super(props)
        this.props.getAllPatients()
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    render() {
        const { patientList } = this.props

        if (!patientList.patients || !patientList.patients.length) {
            return null
        }

        return (
            <div>
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
                </TableContainer>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    patientList: state.patients.patientList
})

const mapDispatchToProps = dispatch => bindActionCreators({ getAllPatients, clearData }, dispatch)

export default AuthRequired(connect(mapStateToProps, mapDispatchToProps)(Patients))