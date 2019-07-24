import React from 'react';
import ReactTable from 'react-table';
import styles from './BlotterTable.css'; // All styling is applied via this stylesheet.

// Created a Dumb Component (also know as a View) to which all the props shall be 
// passed via the Parent so that it is a reusable component.
const TableView = ({ data, columns, filterMethod, minRows, showPagination }) => (
    <ReactTable
        data={data}
        defaultFilterMethod={filterMethod}
        columns={columns}
        minRows={minRows}
        showPagination={showPagination}
    />
);

export default TableView;