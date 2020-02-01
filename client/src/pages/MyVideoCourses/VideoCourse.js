import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {withRouter} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { PUBLIC_CLOUDFRONT_API } from '../../utils/urls'
import Button from '@material-ui/core/Button';


const styles = theme => ({
    card: {
        width: "100%"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    }
})

function VideoCourse(props) {
    const { classes, history } = props
    return (
        <Card className={classes.card}>
            <CardHeader
                title={props.name}
                subheader={props.subname}
            />
            <CardMedia
                className={classes.media}
                image={`${PUBLIC_CLOUDFRONT_API}${props.thumbnail}`}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="contained" color="secondary">
                    Dodaj do koszyka
                </Button>
                <Button size="small" color="primary" onClick={() => {
                    const name = props.name.replace(/ /ig, "-").toLowerCase()
                    history.push(`/kurs/${name}`)
                }}>
                    Szczegóły
                </Button>
            </CardActions>
        </Card>
    )
}

export default withStyles(styles)(withRouter(VideoCourse))