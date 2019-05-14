import React, { Component } from 'react';
import axios from 'axios';
import MenuBar from "./components/MenuBar";
import Bottom from "./components/Bottom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#404040",
      secondary: "#737373",
      disabled: "#8c8c8c",
      hint: "#8c8c8c",
    }
  }
});

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    axios.get('https://bradshaw-dev.azurewebsites.net/api/GetAll')
      .then(d => {
        this.setState({ categories: d.data });
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
            <Bottom categories={this.state.categories} />
          </MuiThemeProvider>
        </header>
      </div>
    );
  }
}

export default App;
