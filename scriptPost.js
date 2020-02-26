import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  //number of virtual users making requests
  vus: 100,
  duration: '3m',
};

export default function() {
  var url = 'http://localhost:3004/images';
  var payload = JSON.stringify({
    imageURL: 'http://lorempixel.com/640/480/people',
    password: 'Thu Feb 06 2020 01:02:59 GMT-0800(Pacific Standard Time)',
    helpful: 30,
    notHelpful: 10,
    restaurantID: 200001,
    userID: 200001
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  for(var id = 198002; id < 199002; id++){
    let res = http.post(url, payload, params, {tags: { name: 'PostItemURL' }});;
    check(res, {
      'status was 200': r => r.status == 200,
      'transaction time OK': r => r.timings.duration < 5000,
    });

  }
  
  //requests in a fraction of a second
  sleep(0.01);
}