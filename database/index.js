const db = require('./indexGres.js');
const faker = require('faker')

const makeQuery = (...queries) => {
  let queryStr = 'select gender, color, style, name, image, item from ';
  const stackQuery = (q, count) => {
    let opening = `(select * from `
    let closing = `clothes where cloth_indx_col @@ to_tsquery('${q[0]}:*') and item > 9985000) as query${count}`;
    let wrapping = `where cloth_indx_col @@ to_tsquery('${q[count] + ':*'}')) as query${count}`;
    if (count === 0) {
      return `(select * from ${closing}`;
    } else {
      return opening += `${stackQuery(q, count-1)} ${wrapping}`;
    }
  }
  if (queries.length === 1) {
    let query = queries.join('');
    return queryStr + `clothes where cloth_indx_col @@ to_tsquery('${query}:*') and item > 9999900 limit 10`;
  }
  return queryStr += `${stackQuery(queries.slice(0, -1), queries.length - 2)} where cloth_indx_col @@ to_tsquery('${queries[queries.length - 1]}:*') limit 10;`;
}
  
  // console.log(makeQuery('grey', 'bikini'))
// console.log(faker.commerce.productAdjective())

const randomStrings = () => {
  let alphabet = '';
  for(var i = 10; i < 36; i++){
      alphabet += i.toString(36)
  }
  let index = (Math.floor(Math.random() * 21));
  return alphabet.slice(index, index + 1 + Math.ceil(Math.random() * 2))
}

const multChoice = (...args) => {
  const rollDice = Math.floor(Math.random() * args.length);
  return args[rollDice];
}
console.log(multChoice('mens', `mens ${randomStrings()}`, randomStrings(), 'womens jog', 'red leggings', 'black'))

// for (var i = 0; i < 50; i++) {
//   console.log(`${randomStrings()}`);
// }