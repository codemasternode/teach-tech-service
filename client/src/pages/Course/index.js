import React from 'react'
import Axios from 'axios';
import { API_URL } from '../../utils/urls';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core'
import VideoPlayer from 'react-player'
import CircularProgress from '@material-ui/core/CircularProgress';
import NavAuth from '../../components/NavAuth'
import Typography from '@material-ui/core/Typography';
import Requirements from './Requirements'
import KnowledgeList from './KnowledgeList'
import Badge from './Badge'
import Sections from './Sections'

const styles = theme => ({
    fullWindow: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    root: {
        marginTop: "4rem",
        maxWidth: 1200,
        marginLeft: "auto",
        marginRight: "auto"
    },
    videoPlayer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        // textAlign: "center",
        marginBottom: "10px"
    },
    subheader: {
        // textAlign: "center",
        marginTop: 0
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
                            <Grid item xs={12}>
                                <h2 className={classes.header}>{this.state.course.name}</h2>
                                <p className={classes.subheader}>{this.state.course.subname}</p>
                            </Grid>
                            <Grid xs={12} sm={9} md={6} item className={classes.videoPlayer}>
                                <VideoPlayer url={this.state.course.welcomeVideo} controls volume
                                />
                            </Grid>
                            <Grid xs={12} sm={12} md={4} item>
                                <Badge price={this.state.course.price}
                                    numberOfExercises={this.state.course.numberOfExercises}
                                    numberOfHoursWork={this.state.course.numberOfHoursWork}
                                    numberOfVideoHours={this.state.course.numberOfVideoHours}
                                />
                            </Grid>
                            <Grid xs={12} md={6} item className={classes.videoPlayer}>
                                <KnowledgeList knowledgeList={this.state.course.knowledgeList} />
                            </Grid>
                            <Grid xs={12} md={4} item>
                                <Requirements requirements={this.state.course.requirements} />
                            </Grid>
                            <Grid xs={12} md={10}>
                                <Sections sections={this.state.course.sections}/>
                            </Grid>
                        </Grid>
                }
            </React.Fragment>

        )
    }
}

export default withStyles(styles)(Course)