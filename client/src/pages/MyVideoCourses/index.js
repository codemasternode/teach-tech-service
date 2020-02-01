import React from 'react'
import Axios from 'axios';
import { API_URL } from '../../utils/urls';
import { AuthContext } from '../../components/AuthContext'
import VideoCourse from './VideoCourse'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import NavAuth from '../../components/NavAuth'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = {
    container: {
        maxWidth: 1200,
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5rem",
    },
    header: {
        marginBottom: "2rem",
        marginLeft: "auto",
        marginRight: "auto"
    }
}

class MyVideoCourses extends React.Component {

    state = {
        videoCourses: []
    }

    componentDidMount = () => {
        Axios({
            method: "GET",
            url: `${API_URL}/api/users/mycourses`,
            withCredentials: true
        }).then((res) => {
            console.log(res)
            this.setState({
                videoCourses: res.data.videoCourses
            })
        }).catch(err => {
            this.context.logout()
        })
    }



    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <NavAuth />
                <Grid container className={classes.container}>
                    <Typography className={classes.header} item xs={12} variant="h4" component="h2">
                        Moje kursy
                    </Typography>
                </Grid>
                <Divider />
                <Grid container spacing={2} className={classes.container}>

                    {
                        this.state.videoCourses.map((value, index) => {
                            return (
                                <Grid item xs={12} sm={12} md={4} key={index}>
                                    <VideoCourse {...value} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </React.Fragment>
        )
    }
}

MyVideoCourses.contextType = AuthContext

export default withStyles(styles)(MyVideoCourses)