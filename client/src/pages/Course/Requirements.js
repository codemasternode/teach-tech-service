import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        width: "100%",
        height: "100%"
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
    listItem: {
        marginTop: 10,
        marginBottom: 10
    }
})

function Requirements(props) {
    const { classes } = props
    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography className={classes.title} variant="h1" color="textSecondary" gutterBottom>
                    Wymagania
                </Typography>
                <ul>
                    {
                        props.requirements.map((value, index) => {
                            return (
                                <li key={index} className={classes.listItem}>{value}</li>
                            )
                        })
                    }
                </ul>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Requirements)