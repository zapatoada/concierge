import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import MenuBar from "./components/MenuBar";
import Bottom from "./components/Bottom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#616161",
      secondary: "#9E9E9E",
      disabled: "#E0E0E0",
      hint: "#E0E0E0",
    }
  }
});

class App extends Component {
  state = {
    dining: []
  }

  componentDidMount() {
    axios.get('https://bradshaw-dev.azurewebsites.net/api/CategoryItems?category=0')
      .then(d => {
        this.setState({ dining: d.data });
      });
  }

  render() {
    return (
      <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        <header className="App-header">
          <MuiThemeProvider theme={theme}>
            <MenuBar />
            <Bottom items={this.state.dining} />
          </MuiThemeProvider>
        </header>
      </div>
    );
  }
}

export default App;
