import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  vus: 10,
  stages: [
    { duration: '10s', target: 50 }, // below normal load
    { duration: '30s', target: 200 },
    { duration: '30s', target: 500 }, // spike to 1400 users
    { duration: '30s', target: 1000 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 500 }, // scale down. Recovery stage.
    { duration: '10s', target: 200 },
    { duration: '10s', target: 0 },
  ]
};

const randomStrings = () => {
    let alphabet = '';
    for (var i = 10; i < 36; i++) {
        alphabet += i.toString(36)
    }
    let index = (Math.floor(Math.random() * 21));
    return alphabet.slice(index, index + 1 + Math.ceil(Math.random() * 2))
}

export default function () {
  const BASE_URL = 'http://localhost:3001'; // make sure this is not production
  const randomStrings = () => {
    let alphabet = '';
    for(var i = 10; i < 36; i++){
        alphabet += i.toString(36)
    }
    let index = (Math.floor(Math.random() * 21));
    return alphabet.slice(index, index + 2)
  }
  const multChoice = (...args) => {
    const rollDice = Math.floor(Math.random() * args.length);
    return args[rollDice];
}
  let endpoint = multChoice('mens', `mens ${randomStrings()}`);
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/api/search/${randomStrings()}`,
      null,
      { tags: { name: 'search' } },
    ],
    [
      'GET',
      `${BASE_URL}/api/search/mens/`,
      null,
      { tags: { name: 'search' } },
    ],
    [
      'GET',
      `${BASE_URL}/api/search/womens black/`,
      null,
      { tags: { name: 'search' } },
    ],
    [
      'GET',
      `${BASE_URL}/api/search/womens pink leggings/`,
      null,
      { tags: { name: 'search' } },
    ]
  ]);
  sleep(1);
}