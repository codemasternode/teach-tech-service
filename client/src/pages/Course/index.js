import React from 'react'
import Axios from 'axios';
import { API_URL } from '../../utils/urls';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core'
import VideoPlayer from 'react-player'
import CircularProgress from '@material-ui/core/CircularProgress';
import NavAuth from '../../components/NavAuth'

const styles = theme => ({
    fullWindow: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    root: {
        marginTop: "4rem"
    },
    videoPlayer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

class Course extends React.Component {

    state = {
        course: null
    }

    componentDidMount = () => {
        console.log(this.props.match.params.name)
        Axios({
            method: "GET",
            url: `${API_URL}/api/video-courses/courses/${this.props.match.params.name.replace(/-/ig, " ")}`,
            withCredentials: true
        }).then((res) => {
            console.log(res)
            this.setState({
                course: res.data.course
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <NavAuth />
                {
                    this.state.course === null ?
                        <Grid className={classes.fullWindow}>
                            <CircularProgress size={60} />
                        </Grid>
                        :
                        <Grid container className={classes.root} spacing={2}>
                            <Grid xs={12} item className={classes.videoPlayer}>
                                <VideoPlayer url={this.state.course.welcomeVideo} controls volume/>
                            </Grid>
                        </Grid>
                }
            </React.Fragment>

        )
    }
}

export default withStyles(styles)(Course)