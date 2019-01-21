// @flow
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { remote } from 'electron';
import fs from 'fs';
import path from 'path';
import CustomList from './CustomList';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dir: '',
      files: [],
      species: []
    };
  }

  selectDirectory = () => {
    remote.dialog.showOpenDialog(
      {
        properties: ['openDirectory']
      },
      filePaths => {
        fs.readdir(filePaths[0], (err, files) => {
          if (err) throw err;
          const filteredFiles = files.filter(
            f => path.extname(f) === '.mp3' || path.extname(f) === '.wav'
          );
          this.setState({ dir: filePaths[0], files: filteredFiles });
        });
      }
    );
  };

  render() {
    const { dir, files, species } = this.state;
    return (
      <div className="column col-xs-24 center-xs" data-tid="container">
        <h1>Aureas</h1>
        <div className="row col-xs-24 center-xs">
          <div className="col-xs-11">
            <Paper elevation={1}>
              <h2>Folder</h2>
              <Button variant="contained" onClick={this.selectDirectory}>
                Select directory
              </Button>
              <List className="FileList">
                <ListItem>
                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
              </List>
              <Divider />
              <CustomList dir={dir} items={files} />
            </Paper>
          </div>
          <div className="col-xs-off-1 col-xs-11 row-xs-24 column">
            <div className="row-xs-20">
              <Paper elevation={1}>
                <h2>Species</h2>
                <CustomList items={species} addText="Add species" />
              </Paper>
            </div>
            <div className="row-xs-2" />
            <div className="row-xs-2">
              <Button variant="contained" onClick={this.selectDirectory}>
                SEARCH
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}