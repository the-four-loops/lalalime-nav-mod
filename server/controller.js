const db = require('../database/indexGres.js')

const makeQuery = (queries) => {
  let queryStr = 'select gender, color, style, name, image, item from ';
  const stackQuery = (q, count) => {
    let opening = `(select * from `
    let closing = `clothes where cloth_indx_col @@ to_tsquery('${q[0]}:*') and item > 9999000) as query${count}`;
    let wrapping = `where cloth_indx_col @@ to_tsquery('${q[count] + ':*'}')) as query${count}`;
    if (count === 0) {
      return `(select * from ${closing}`;
    } else {
      return opening += `${stackQuery(q, count-1)} ${wrapping}`;
    }
  }
  if (queries.length === 1) {
    let query = queries.join('');
    return queryStr + `clothes where cloth_indx_col @@ to_tsquery('${query}:*') and item > 9999000 limit 10`;
  }
  return queryStr += `${stackQuery(queries.slice(0, -1), queries.length - 2)} where cloth_indx_col @@ to_tsquery('${queries[queries.length - 1]}:*') limit 10;`;
}

const controller = {
  get: (req, res) => {
    let { query } = req.params;
    let queryStr = makeQuery(query.split(' '));
    db.query(queryStr, (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(result.rows);
      }
    })
  }
}

module.exports = controller;