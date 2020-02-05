import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import If from '../common/If'

import { withStyles } from '@material-ui/core/styles';
import AuthorizationStyles from './Authorization.styles'
import Signup from './Signup.component';
import Signin from './Signin.component';
import { Paper, Typography, Grid } from '@material-ui/core';

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
            <Grid container component="main" className={classes.root}>
                <Grid item xs={false} sm={4} md={8} className={classes.image} />
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                    <div className={classes.paper}>

                        <Typography variant='h4' align='center'>
                            Physio Manager
                        </Typography>
                        <If test={isLoginActive}>
                            <Signin />
                        </If>
                        <If test={!isLoginActive}>
                            <Signup />
                        </If>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    isLoginActive: state.authorization.isLoginActive
})

// const mapDispatchToProps = dispatch => bindActionCreators({changeIsLoginActive}, dispatch)

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(Authorization))