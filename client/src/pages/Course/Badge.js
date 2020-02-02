import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MovieIcon from '@material-ui/icons/Movie';
import WorkIcon from '@material-ui/icons/WorkOutline'
import CodeIcon from '@material-ui/icons/Code'
import HistoryIcon from '@material-ui/icons/History'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'

const styles = theme => ({
    card: {
        width: "100%",
        height: `calc(100% - 20px)`,
        marginTop: 20
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
    icon: {
        marginRight: 6
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 0,
        paddingRight: 0
    },
    priceLabel: {
        width: "100%",
        textAlign: "center",
        color: "white",
        fontSize: 20,
        backgroundColor: "#2196f3",
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    badge: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    badgeInfo: {
        display: "flex",
        justifyContent: "center"
    },
    badgeIcon: {
        marginRight: 8
    },
    paragraph: {
        marginTop: 4,
        marginBottom: 4
    }
})

function Badge(props) {
    const { classes } = props
    return (
        <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent}>
                <Button variant="contained" color="secondary">
                    <ShoppingCartIcon className={classes.icon} />
                    Dodaj do koszyka
                </Button>
                <div className={classes.priceLabel}>
                    {props.price.toString().replace(".", ",")} zł
                </div>
                <div className={classes.badge}>
                    <div className={classes.badgeInfo}>
                        <CodeIcon className={classes.badgeIcon} />
                        <p className={classes.paragraph}>{props.numberOfExercises} ćwiczeń do wykonania</p>
                    </div>
                    <div className={classes.badgeInfo}>
                        <WorkIcon className={classes.badgeIcon} />
                        <p className={classes.paragraph}>{props.numberOfHoursWork}h samodzielnej pracy</p>
                    </div>
                    <div className={classes.badgeInfo}>
                        <MovieIcon className={classes.badgeIcon} />
                        <p className={classes.paragraph}>{props.numberOfVideoHours}h materiału filmowego</p>
                    </div>
                    <div className={classes.badgeInfo}>
                        <HistoryIcon className={classes.badgeIcon} />
                        <p className={classes.paragraph}>Dożywotni dostęp</p>
                    </div>
                    <div className={classes.badgeInfo}>
                        <ContactSupportIcon className={classes.badgeIcon} />
                        <p className={classes.paragraph}> Odpłatna pomoc w zrozumieniu</p>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Badge)