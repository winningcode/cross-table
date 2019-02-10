import React, { Component } from 'react';
import Table from './Table/Table';

import axios from "./axios";
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';



class App extends Component {
  state = {
    columns: ['INR', 'USD', 'GBP', 'JPY','AUD', 'CHF', 'CAD', 'NZD', 'RUB', 'AUD', 'MXN', 'ZAR'],
    rows:[]
  }

  
  constructor( props ) {
    super( props );
  }

  componentWillMount () {
    var allColumns  = this.state.columns.join(',');

    this.state.columns.forEach(function(baseCurrency){
      
      axios
      .get("/latest?symbols="+ allColumns + "&base=" + baseCurrency)
      .then(response => {
        const rows = [...this.state.rows];
        const rates = response.data.rates;
        rates['base'] = baseCurrency;
        rows.push(response.data.rates);
        
        this.setState({
          rows: rows
        });
      })
      .catch(error => {
        console.log(error);
      });
    }, this);
    
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact render={() => <Table columns={this.state.columns} rows={this.state.rows} /> }> </Route>
      </BrowserRouter>
    );
  }
}




export default App;
