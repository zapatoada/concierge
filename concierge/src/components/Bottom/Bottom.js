import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import Typography from '@material-ui/core/Typography';
import Item from '../Item'
import "./Bottom.css";


// import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
  page: {
    marginTop: '5rem'
  },
  scroll: {
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'auto',
    paddingRight: '1rem'
  },
  spacer: {
    opacity: 0,
    minWidth: '1px'
  },
  pageTitle: {
    marginBottom: '2rem'
  }
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
    window.appInsights && window.appInsights.trackPageView(`tab-${value}-${event.target.innerText}`);
    this.setState({ value });
  };

  render() {
    const { classes, categories } = this.props;
    const { value } = this.state;
    const dining = categories.filter(p => p.Name === 'My Picks Restaurants')[0];
    const todo = categories.filter(p => p.Name === 'Things to Do Close By')[0];
    const museums= categories.filter(p => p.Name === 'Museums')[0];


    return (
      //   <Paper square className={classes.root}>

      <div className="classes.root">
        <div>
          {value === 0 && <TabContainer><div className='homeBackground'>
            <div className={classes.page}>
              <Typography variant="h3" className={classes.pageTitle}>
                Welcome to Richmond, Mr. Agelasto
            </Typography>
            </div>
            <Typography variant="h4" className={classes.pageTitle}>
              Enjoy your stay!
            </Typography>
          </div>
          </TabContainer>}
          {value === 1 && <TabContainer>
            <div className='eventsBackground'>
              <div className={classes.page}>
                <Typography variant="h3" className={classes.pageTitle}>
                  Things To Do Close By
              </Typography>
                <div className={classes.scroll}>
                  {todo && todo.items && todo.items.map(p => (
                    <Item item={p} key={p.rowKey} />
                  ))}
                  {/* stupid hack because css is dumb */}
                  <div className={classes.spacer} />
                </div>
              </div>
            </div>
          </TabContainer>}
          {value === 2 &&
            <TabContainer>
              <div className='diningBackground'>
                <div className={classes.page}>
                  <Typography variant="h3" className={classes.pageTitle}>
                    My Picks
                  </Typography>
                  <div className={classes.scroll}>
                    {dining && dining.items && dining.items.map(p => (
                      <Item item={p} key={p.rowKey} />
                    ))}
                    {/* stupid hack because css is dumb */}
                    <div className={classes.spacer} />
                  </div>
                </div>
              </div>
            </TabContainer>}
          {value === 3 &&
            <TabContainer>
              <div className='attractionsBackground'>
              <div className={classes.page}>
              <Typography variant="h3" className={classes.pageTitle}>
                Museums
              </Typography>
              <div className={classes.scroll}>
                {museums && museums.items && museums.items.map(p => (
                  <Item item={p} key={p.rowKey} />
                ))}
                {/* stupid hack because css is dumb */}
                <div className={classes.spacer} />
              </div>
            </div>
              </div>
            </TabContainer>}
        </div>

        <div style={{ position: "fixed", bottom: "0", left: "0", width: "100%", textColor: 'ffffff' }}>

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="secondary"
            textColor="secondary"

          >
            <Tab icon={<CardTravelIcon />} label="YOUR VISIT" />
            <Tab icon={<NewReleasesIcon />} label="THINGS TO DO CLOSE BY" />
            <Tab icon={<LocalDiningIcon />} label="MY PICKS RESTAURANTS" />
            <Tab icon={<NaturePeopleIcon />} label="MUSEUMS" />
          </Tabs>
        </div>
      </div>
      //   </Paper>
    );
  }
}

Bottom.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(Bottom);