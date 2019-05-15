import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import PinDropIcon from '@material-ui/icons/PinDrop';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import Typography from '@material-ui/core/Typography';
import Item from '../Item'
import "./Bottom.css";


// import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';


const categoryIconMap = {
  "restaurants within 1 block": <LocalDiningIcon />,
  "breakfast": <FreeBreakfastIcon />,
  "my picks restaurants": <NewReleasesIcon />,
  "things to do close by": <PinDropIcon />,
  "music": <MusicNoteIcon />,
  "beer": <LocalDrinkIcon />,
  "museums": <AccountBalanceIcon />
}

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
    paddingRight: '1rem',
    height: 'calc(100vh - 235px)'
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
    <Typography component="div" variant="body2">
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
    Array.from(document.querySelectorAll('.scroll')).forEach(e => e.scrollLeft = 0);
    this.setState({ value });
  };

  render() {
    const { classes, categories } = this.props;
    const { value } = this.state;
    const currentTab = value > 0 ? categories[value - 1] : null;

    return (
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

          {currentTab && value > 0 && <TabContainer>
            <div className="eventsBackground">
              <div className={classes.page}>
                <Typography variant="h3" className={classes.pageTitle}>
                  {currentTab.Name}
                </Typography>
                <div className={`${classes.scroll} scroll`}>
                  {currentTab.items && currentTab.items.map(p => (
                    <Item item={p} ke741y={p.RowKey} />
                  ))}
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
            varient="fullWidth"
            indicatorColor="secondary"
            textColor="secondary">

            <Tab icon={<CardTravelIcon />} label="YOUR VISIT" />
            {categories.map(c =>
              <Tab icon={categoryIconMap[c.Name.toLowerCase()]} label={c.Name.toUpperCase()} key={c.RowKey} />
            )}
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