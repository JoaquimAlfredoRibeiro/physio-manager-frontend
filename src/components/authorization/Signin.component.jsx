import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import _ from 'lodash'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Translate } from 'react-redux-i18n'

import { withStyles } from '@material-ui/core/styles';
import AuthorizationStyles from './Authorization.styles'

import Copyright from '../common/Copyright.component'

import { changeIsLoginActive, loginUser } from './AuthorizationActions'

var I18n = require('react-redux-i18n').I18n;
const styles = AuthorizationStyles;

class Signin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoginActive: this.props.isLoginActive,
            email: 'user@gmail.com',
            password: 'user1234',
            errors: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    changeLoginActive() {
        this.props.changeIsLoginActive(!this.props.isLoginActive)
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user, this.props.history)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.errors) {
            return {
                errors: props.errors
            }
        }

        return null;
    }

    render() {
        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <div>
                <Container component="main" maxWidth="xs" >
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            <Translate value='login.signin' />
                        </Typography>

                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={<Translate value='global.email' />}
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                error={Boolean(`${_.get(errors, ['fields', 'email'], '')}`)}
                                helperText={I18n.t(`loginValidation.${_.get(errors, ['fields', 'email'], '')}`)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={<Translate value='login.password' />}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                                error={Boolean(`${_.get(errors, ['fields', 'password'], '')}`)}
                                helperText={I18n.t(`loginValidation.${_.get(errors, ['fields', 'password'], '')}`)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label={<Translate value='login.rememberMe' />}
                            />
                            <Typography variant='subtitle1' align='center' style={{ marginTop: '5px' }}><Translate value='login.tryApp' /></Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {<Translate value='login.signin' />}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" >
                                        <Translate value='login.forgotPassword' />
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={() => this.changeLoginActive()}>
                                        {<Translate value='login.noAccountPrompt' />}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container >
            </div >
        );
    }
}

Signin.propTypes = {
    loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isLoginActive: state.authorization.isLoginActive,
    errors: state.errors
})

const mapDispatchToProps = dispatch => bindActionCreators({ changeIsLoginActive, loginUser }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Signin)))