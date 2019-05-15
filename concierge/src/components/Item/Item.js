import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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

    constructor() {
        super(...arguments);
        this.handleDirectionsClick=this.handleDirectionsClick.bind(this);        
        this.handleEventsClick=this.handleEventsClick.bind(this);
        this.handleMenuClick=this.handleMenuClick.bind(this);
    }

    handleDirectionsClick() {
        window.appInsights && window.appInsights.trackEvent('directions', {name:this.props.item.name,id: this.props.item.RowKey});
        window.open(`https://www.google.com/maps/dir/${this.props.startAddress}/${this.props.item.address}`, "_conc");
    }

    
    handleMenuClick() {
        window.appInsights && window.appInsights.trackEvent('menu', {name:this.props.item.name,id: this.props.item.RowKey});
        window.open(this.props.item.menu, "_conc");
    }

    
    handleEventsClick() {
        window.appInsights && window.appInsights.trackEvent('events', {name:this.props.item.name,id: this.props.item.RowKey});
        window.open(this.props.item.calendar, "_conc");
    }
   

    render() {
        const { classes, item } = this.props;
        return <Card className={classes.card}>

            <CardMedia
                className={classes.media}
                image={item.image_url}
                title={item.name}
            />
            <CardContent>
                <Typography variant="h4" gutterBottom={true}>
                    {item.name}
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>{item.notes}</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                {item.address && <Button color="primary" className="button" onClick={this.handleDirectionsClick}>
                    Directions
                </Button>}
                {item.menu && <Button size="large" color="primary" className="button" onClick={this.handleMenuClick}>
                    Menu
                </Button>}
                {item.calendar && <Button size="large" color="primary" className="button" onClick={this.handleEventsClick}>
                    Events
                </Button>}
            </CardActions>
        </Card>;
    }
}

export default withStyles(styles)(Item);