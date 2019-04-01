import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import Typography from '@material-ui/core/Typography';
import "./Bottom.css";


// import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
};

function TabContainer(props) {
    return (
      <Typography component="div">
        {props.children}
      </Typography>
    );
  }

  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

class Bottom extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;


    return (
    //   <Paper square className={classes.root}>

    <div className="classes.root">
        <div>
            {value === 0 && <TabContainer><div className='homeBackground'><div className="center">Item One</div></div></TabContainer>}
            {value === 1 && <TabContainer><div className='eventsBackground'><div className="center">Item Two</div></div></TabContainer>}
            {value === 2 && <TabContainer><div className='diningBackground'><div className="center">Item Three</div></div></TabContainer>}
            {value === 3 && <TabContainer><div className='attractionsBackground'><div className="center">Item Four</div></div></TabContainer>}
        </div>

        <div style={{position: "fixed", bottom:"0", left:"0", width:"100%", textColor:'ffffff'}}>

            <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="secondary"
            textColor="secondary"
            
            >
            <Tab icon={<CardTravelIcon />} label="YOUR VISIT" />
            <Tab icon={<NewReleasesIcon />} label="SPECIAL EVENTS" />
            <Tab icon={<LocalDiningIcon />} label="DINING" />
            <Tab icon={<NaturePeopleIcon />} label="ATTRACTIONS" />
            </Tabs>
        </div>
    </div>
    //   </Paper>
    );
  }
}

Bottom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bottom);