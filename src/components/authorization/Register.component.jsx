import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Translate } from 'react-redux-i18n'

import { withStyles } from '@material-ui/core/styles';
import AuthorizationStyles from './Authorization.styles'

import Copyright from './Copyright.component'

import { changeIsLoginActive } from './AuthorizationActions'

const styles = AuthorizationStyles;

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoginActive: this.props.isLoginActive
        };
    };

    changeIsLoginActive() {
        this.props.changeIsLoginActive(!this.state.isLoginActive)
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs" >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        <Translate value='login.register' />
                    </Typography>

                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id='firstName'
                                    label={<Translate value='login.firstName' />}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label={<Translate value='login.lastName' />}
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label={<Translate value='login.email' />}
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label={<Translate value='login.password' />}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="repeatPassword"
                                    label={<Translate value='login.repeatPassword' />}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            <Translate value='login.register' />
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => this.changeIsLoginActive()} >
                                    <Translate value='login.accountPrompt' />
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    isLoginActive: state.authorization.isLoginActive
})

const mapDispatchToProps = dispatch => bindActionCreators({ changeIsLoginActive }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Register))