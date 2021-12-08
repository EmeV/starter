const axios = require('axios').default;


//axios.get('/order/:oderId')
//axios.get('/order?oderId=234')
axios.get('/?oderId')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  module.exports = axios;