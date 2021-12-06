
const mongoose = require('mongoose');
// const server = 'shop-shard-00-00.umpfd.mongodb.net:27017'; // REPLACE WITH YOUR DB SERVER
// const server = 'shop-shard-00-01.umpfd.mongodb.net:27017'; // REPLACE WITH YOUR DB SERVER
//const server = '79.119.103.1:27017'; // REPLACE WITH YOUR DB SERVER
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'shop';      // REPLACE WITH YOUR DB NAME

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${server}/${database}`)
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error')
  });

  console.log("wating in db");
}

module.exports = main;