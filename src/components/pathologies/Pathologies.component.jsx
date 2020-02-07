import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Translate } from 'react-redux-i18n'
import AuthRequired from '../common/AuthRequired'

class Pathologies extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    <Translate value={'pathologies.welcome'} />
                </h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // patientList: state.patients.patientList
})

// const mapDispatchToProps = dispatch => bindActionCreators({ getAllPatients, clearData }, dispatch)

export default AuthRequired(connect(mapStateToProps, null)(Pathologies))
