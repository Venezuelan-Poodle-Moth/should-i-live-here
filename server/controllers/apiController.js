// controller for accessing city database
// controller for accessing city databse

// npm package that allows the use of fetch without the browser (ie in postman)
const fetch = require('isomorphic-fetch');

// app identifier to allow more queries to database
const appToken = 'rvAoMk2CVgwcxb3uzQw8lxP1k';

const apiController = {};

// function to format string correctly with regex for database query
const format = (str) => {
  // const string = str.replace(/(th)|(st)|(nd)|(rd)\b/i, '')
  //   .replace(/st/i, 'STREET')
  //   .replace(/ave?/i, 'AVENUE')
  //   .replace(/blvd/i, 'BOULEVARD')
  //   .replace(/pl/i, 'PLACE')
  //   .replace(/pt/i, 'POINT')
  //   .replace(/\b(w)\b/i, 'WEST')
  //   .replace(/\b(e)\b/i, 'EAST')
  //   .replace(/\b(s)\b/i, 'SOUTH')
  //   .replace(/\b(n)\b/i, 'NORTH')
  //   .replace(/  +/g, ' ')
  //   .trim()
  //   .toUpperCase();
  // return string;

  //* new formatting style using the google places api
  const arr = str.toUpperCase().split(',');
  arr[0] = arr[0].replace(/(\d+)th/i, "$1");
  arr[0] = arr[0].replace(/(\d+)st/i, "$1");
  arr[0] = arr[0].replace(/(\d+)nd/i, "$1");
  arr[0] = arr[0].replace(/(\d+)rd/i, "$1");
  arr[1] = arr[1].replace(' ', '');
  console.log('address: ', arr);
  return arr;
};

// function to fetch data from the api
apiController.getData = (req, res, next) => {
  const addressArr = format(req.body.address);
  // const borough = req.body.borough.toUpperCase();
  console.log(addressArr);

  fetch(`https://data.cityofnewyork.us/resource/erm2-nwe9.json?incident_address='${addressArr[0]}'&$where=city='${addressArr[1]}'`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-App-Token': appToken,
      },
    })
    .then((data) => data.json())
    .then((data) => {
      // sort data by date
      data.sort((a, b) => {
        return Date.parse(b.created_date) - Date.parse(a.created_date);
      });
      // split off year of created_date element and filter data to only inlcude entries in the past 3 years
      // parse dates into javascript readable date format
      // only show dates that are within 3 years of the current date
      let filtered = data.filter((el) => {
        return (Date.parse(el.created_date) > (Date.now() - 94670856000));
      });

      const filteredData = filtered.map((elem) => ({
        date: elem.created_date,
        address: elem.incident_address,
        borough: elem.borough,
        complaintType: elem.complaint_type,
        description: elem.descriptor,
        location: elem.location, // location: {latitude: '40', longitude: '-73'}
      }));
      // console.log(filteredData);
      res.locals.data = filteredData;
    })
    .then(next)
    .catch((err) => next({
      log: err,
      message: { err: 'there was an error fetching 311 data' },
    }));
};

module.exports = apiController;
