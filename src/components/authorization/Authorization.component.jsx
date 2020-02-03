import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import If from '../common/If'

import { withStyles } from '@material-ui/core/styles';
import AuthorizationStyles from './Authorization.styles'
import RegisterComponent from './Register.component';
import LoginComponent from './Login.component';
import { Paper, Typography } from '@material-ui/core';

import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

const styles = AuthorizationStyles;

class Authorization extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoginActive: this.props.isLoginActive
        };
    };

    render() {
        const { classes } = this.props;
        const { isLoginActive } = this.props

        return (
            <section className={classes.container}>
                <Paper className={classes.leftHalf} />
                <div className={classes.rightHalf}>
                    <Typography variant='h4' align='center' style={{ paddingTop: '30px' }}>
                        Physio Manager
                    </Typography>
                    <If test={isLoginActive}>
                        <LoginComponent />
                    </If>
                    <If test={!isLoginActive}>
                        <RegisterComponent />
                    </If>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    isLoginActive: state.authorization.isLoginActive
})

// const mapDispatchToProps = dispatch => bindActionCreators({changeIsLoginActive}, dispatch)

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(Authorization))