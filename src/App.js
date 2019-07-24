import React, { PureComponent } from 'react';
import autobind from 'react-autobind';
import 'react-table/react-table.css'

import { getTableColumnData, getOrderData } from './services/dataAggregator';
import BlotterTable from './components/BlotterTableContainer';

class MainApp extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orderData: [],
      columnData: [],
    };
    autobind(this);   // Do you know about autobind of react-autobind: https://www.npmjs.com/package/react-autobind
  };

  async componentDidMount() {
    const columnData = await getTableColumnData();
    this.setState({ columnData: columnData });
    const orderData = await getOrderData();
    this.setState({ orderData: orderData });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Blotter</h1>
        <BlotterTable
          data={this.state.orderData}
          columns={this.state.columnData}
        />
      </React.Fragment>
    );
  };
}

export default MainApp;
