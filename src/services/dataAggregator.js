import { fetchRequest, buildOptions, checkResponse } from './serviceHelpers';

const columnUrl = 'https://restsimulator.intuhire.com/blotter_columns';
const orderData = 'https://restsimulator.intuhire.com/orders';

// Incase it makes sense to get Column data without transformation, I have kept the getColumnData function.
// It can be exported if we want to process it more.
const getColumnData = () =>
  fetchRequest(`${columnUrl}`, () => buildOptions('GET', undefined, true))
    .then(checkResponse('Data to Populate Columns'))
    .then(columnData => {
        return columnData;
    });

export const getOrderData = () =>
  fetchRequest(`${orderData}`, () => buildOptions('GET', undefined, true))
    .then(checkResponse('Data to Populate Rows'))
    .then(rowsData => rowsData);

export const getTableColumnData = () => {
  let tableColumnData = [];
  return getColumnData().then((rawColumnData) => {
    rawColumnData.forEach(data=> {
      tableColumnData.push({
        'Header': data.column_name,
        'accessor': data.column_name
      });
    });
    return tableColumnData;
  });
}