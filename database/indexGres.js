const {Client} = require('pg')

const client = new Client({
    user: 'cjtywoniak',
    host: 'localhost',
    database: 'lalagres',
    password: '',
    port: 5432,
  })
  client.connect(err => {
      if (err) {
      console.log(err);
      } else {
        console.log("i'll tumble fooor ya")  
      }
  })
//   client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     client.end()
//   })

module.exports = client;