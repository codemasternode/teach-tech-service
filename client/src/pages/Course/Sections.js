import React from 'react'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description'
import HQIcon from '@material-ui/icons/HighQuality'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    card: {
        width: "100%",
        marginTop: 20
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 0,
        paddingRight: 0
    },
    header: {
        marginTop: 30
    }
})

function Sections(props) {
    const { classes } = props
    return (
        <React.Fragment>
            <Typography variant="h4" component="h2" className={classes.header}>
                Rozdziały
            </Typography>
            {
                props.sections.map((value, index) => {
                    console.log(value)
                    return (
                        <ExpansionPanel className={classes.card}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>{index + 1}. {value.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <List className={classes.root}>
                                    {
                                        value.videoSources.map((value, index) => {
                                            return (
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <HQIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={value.name} secondary="Materiał video" />
                                                </ListItem>
                                            )
                                        })
                                    }
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <DescriptionIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${value.numberOfExercises} ćwiczeń`} secondary="Materiał ćwiczeniowy" />
                                    </ListItem>
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
            }
        </React.Fragment>
    )
}

export default withStyles(styles)(Sections)