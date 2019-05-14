import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
        width: 'calc(30vw - 1.8rem)',
        margin: '1rem',
        flexGrow: '0',
        flexShrink: '0',
        position: 'relative',
        paddingBottom: '3rem',
        textAlign: 'left'
    },
    media: {
        height: 'calc((30vw - 1.8rem) * 9 / 16)'
    },
    actions: {
        position: 'absolute',
        bottom: 0
    },
    button: {
        fontSize: '1rem'
    },
    description: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxHeight: '220px'
    }
});

class Item extends React.Component {
    render() {
        const { classes, item } = this.props;
        return <Card className={classes.card}>

            <CardMedia
                className={classes.media}
                image={item.image_url}
                title={item.name}
            />
            <CardContent>
                <Typography variant="h4" gutterBottom="1">
                    {item.name}
                </Typography>
                <Typography variant="h6" className={classes.description}>{item.notes}</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button color="primary" className="button">
                    Directions
                </Button>
                {item.menu && <Button size="large" color="primary" className="button">
                    Menu
                </Button>}
                {item.calendar && <Button size="large" color="primary" className="button">
                    Events
                </Button>}
            </CardActions>
        </Card>;
    }
}

export default withStyles(styles)(Item);