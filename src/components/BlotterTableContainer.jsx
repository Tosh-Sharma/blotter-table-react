import React, { PureComponent } from 'react';
import autobind from 'react-autobind';

import TableView from './TableView';
import styles from './BlotterTable.css';

class BlotterTable extends PureComponent {
    constructor(props) {
       super(props);
       this.state = {};
       autobind(this);
    };

    // The default filtering on the React Table seems to be case sensitive
    // so applying this function to make it case-insensitive.
    filterMethod = (filter, row) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
    };

    renderSearchableColumns = columns => {
        const searchableColumns = columns.filter(column => {
            // React Table provides us with Sorting inbuilt so disabling it on all except for the Time Column.
            if(column.Header === 'Time') {
                column.sortable = true;
            } else {
                column.sortable = false;
            }

            if(column.Header === 'CcyPair' || column.Header === 'Status') {
                column.filterable = true;
            }

            return column;  
        });
        return searchableColumns;
    };

    // Applying Styles by accessing the Row values.
    renderStyledColumns = searchableColumns => {
        let styledColumns = [...searchableColumns];
        return styledColumns.filter((column) => {
            if(column.accessor === 'Side') {
                column.Cell = row => (
                    <div style={{
                        color: row.value === 'Buy' ? '#00A95D'
                          : '#E7152D',
                      }}>
                          {row.value}
                      </div>
                  )
            }

            if(column.accessor === 'Status') {
                column.Cell = row => (
                    <div style={{
                        color: row.value === 'Filled' ? '#A9A9A9'
                        : row.value === 'Cancelled' ? '#E7152D'
                        : '#FFF',
                      }}>
                          {row.value}
                      </div>
                )
            }
            return column;
        });
    };

    render() {
    const { data, columns } = this.props; 
    const searchableColumns = this.renderSearchableColumns(columns);
    const styledColumns = this.renderStyledColumns(searchableColumns);

    return (
        <div className={styles.blotterTable}>
            <TableView
                data={data}
                columns={styledColumns}
                filterMethod={this.filterMethod}
                minRows="1"
                showPagination={false}
            />
        </div>
        );
    }
}

export default BlotterTable;
