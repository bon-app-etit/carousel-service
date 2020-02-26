import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  //number of virtual users making requests
  vus: 100,
  duration: '10s',
};

export default function() {

  //Grouping and Explicit tags, loop of 1000
  for(var id = 198002; id < 199002; id++){
    let res = http.get(`http://localhost:3000/images/restaurants/${id}`);
    check(res, {
      'status was 200': r => r.status == 200,
      'transaction time OK': r => r.timings.duration < 500,
    });

  }
  //requests in a fraction of a second.
  sleep(0.01);
}