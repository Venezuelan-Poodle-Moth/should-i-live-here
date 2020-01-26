//controller for accessing city databse

// app identifier to allow more queries to database
const appToken = 'rvAoMk2CVgwcxb3uzQw8lxP1k' 

const apiController = {};

apiController.getData = (req, res, next) => {
    const { address, borough } = req.body;
    fetch(`https://data.cityofnewyork.us/resource/erm2-nwe9.json?incident_address='${address}'&$where=borough='${borough}`, 
    { headers: {
        'Content-Type': 'application/json', 
        'X-App-Token': appToken
    }})
    .then(data => data.json())
    .then(data => {
      const filterdData = data.map(elem => {
        return { 
          date: elem.created_date,
          address: elem.incident_address,
          borough: elem.borough,
          complaintType: elem.complaint_type, 
          description: elem.description,
        };
      })
      res.locals.data = filterdData;
    })
    .then(next)
    .catch(err => next({
      log: err,
      message: {err: 'An error occurred in fetching 311 data'}
    }));
};

















module.exports = apiController;