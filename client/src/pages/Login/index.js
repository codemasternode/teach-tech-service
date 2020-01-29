import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Axios from 'axios'
import { API_URL } from '../../utils/urls'
import { withRouter } from 'react-router-dom'
import Snackbar from '../../components/Snackbar'

const styles = theme => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh"
    },
    card: {
        width: 500,
        marginLeft: "auto",
        marginRight: "auto"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    footer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
        marginBottom: "3rem"
    },
    headerCenter: {
        textAlign: "center",
        marginTop: "3rem",
        marginBottom: "2rem"
    },
    form: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
    }
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Login extends React.Component {
    state = {
        email: {
            value: "",
            isError: false,
            helperText: ""
        },
        password: {
            value: "",
            isError: false,
            helperText: ""
        },
        openInfoWindow: false
    }

    loginSubmit = () => {
        if (this.state.email.value === "") {
            const toCopy = this.state.email
            this.setState({
                email: {
                    ...toCopy,
                    helperText: "Puste pole",
                    isError: true
                }
            })
            return
        }

        if (this.state.password.value === "") {
            const toCopy = this.state.password
            this.setState({
                password: {
                    ...toCopy,
                    helperText: "Puste pole",
                    isError: true
                }
            })
            return
        }

        if (!validateEmail(this.state.email.value)) {
            const toCopy = this.state.email
            this.setState({
                email: {
                    ...toCopy,
                    helperText: "Nieprawidłowy email",
                    isError: true
                }
            })
            return
        }

        Axios({
            url: `${API_URL}/api/auth/login`,
            withCredentials: true,
            method: "POST",
            data: {
                email: this.state.email.value,
                password: this.state.password.value
            }
        }).then((res) => {
            this.props.history.push("/moje-kursy")
        }).catch((err) => {
            
        })
    }

    changeInput = (e) => {
        const toCopy = this.state[e.target.name]
        this.setState({
            [e.target.name]: {
                ...toCopy,
                value: e.target.value
            }
        })
    }

    handleClose = (isOpen) => {
        return () => {
            this.setState({
                openInfoWindow: isOpen
            })
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2" className={classes.headerCenter}>
                            Logowanie
                        </Typography>
                        <div className={classes.form}>
                            <TextField
                                label="Email"
                                placeholder="Adres email"
                                value={this.state.email.value}
                                helperText={this.state.email.helperText}
                                error={this.state.email.isError}
                                name="email"
                                onChange={this.changeInput}
                            />
                            <TextField
                                label="Hasło"
                                placeholder="Hasło"
                                value={this.state.password.value}
                                helperText={this.state.password.helperText}
                                error={this.state.password.isError}
                                name="password"
                                onChange={this.changeInput}
                            />
                        </div>
                    </CardContent>
                    <CardActions className={classes.footer}>
                        <Button variant="contained" color="secondary" size="small" onClick={this.loginSubmit}>Zaloguj</Button>
                        <Button color="primary" size="small" onChange={() => {
                            this.props.history.push("/register")
                        }}>Zarejestruj</Button>
                    </CardActions>
                </Card>
                <Snackbar open={this.state.openInfoWindow} handleOpen={this.handleClose} alertType="error" />
            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(withRouter(Login))