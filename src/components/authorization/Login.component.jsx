import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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

import Copyright from './Copyright.component'

import { changeIsLoginActive } from './AuthorizationActions'

const styles = AuthorizationStyles;

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoginActive: this.props.isLoginActive
        };
    };

    changeLoginActive() {
        this.props.changeIsLoginActive(!this.props.isLoginActive)
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            <Translate value='login.signin' />
                        </Typography>

                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={<Translate value='login.email' />}
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label={<Translate value='login.rememberMe' />}
                            />
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoginActive: state.authorization.isLoginActive
})

const mapDispatchToProps = dispatch => bindActionCreators({ changeIsLoginActive }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Login))