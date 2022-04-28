import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

// export default function() {
//   http.get('http://localhost:3000/products/1/'); // get request to input URI
//   sleep(1); // sleep while a second
// }

//Smoke test
export const options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://localhost:3000/products/1/';

export default () => {

  const myObjects = http.get(`${BASE_URL}`);
  check(myObjects, {'got data in successfully': (resp) => resp.json('rows').length > 0 });

  sleep(1);
};