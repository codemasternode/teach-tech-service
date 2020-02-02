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
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
    listItem: {
        marginTop: 20,
        marginBottom: 20
    }
})

function KnowledgeList(props) {
    const { classes } = props
    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography className={classes.title} variant="h1" color="textSecondary" gutterBottom>
                    Czego się nauczysz
                </Typography>
                <ul>
                    {
                        props.knowledgeList.map((value, index) => {
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

export default withStyles(styles)(KnowledgeList)