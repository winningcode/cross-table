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
  
  componentDidMount () {
    this.loadData();
  }

  loadData(){
    const currencyRates = [];
    var allColumns  = this.state.columns.join(',');
    this.state.columns.map(baseCurrency=> currencyRates.push(this.fetchData(baseCurrency, allColumns)))
    Promise.all(currencyRates)
      .then((dataArray) => {
        this.setState({
          rows: dataArray
        });
      })
    
  }

  fetchData(baseCurrency, allColumns){
    return axios
      .get("/latest?symbols="+ allColumns + "&base=" + baseCurrency)
      .then(response => {
        const rates = response.data.rates;
        rates['base'] = baseCurrency;
        return response.data.rates;
      })
      .catch(error => {
        console.log(error);
      });
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
