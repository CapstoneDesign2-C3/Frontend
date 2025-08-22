// docker run --rm -it -v ${PWD}:/scripts -e K6_LOG_LEVEL=info grafana/k6 run /scripts/rest_test.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,           // 동시 VU 1명만 실행
    iterations: 50,   // 총 50번 실행
};

export default function () {
    const url = 'http://3.35.16.8/api/v1/report/create-mobile-object-track';

    const payload = JSON.stringify({
        mobileObjectIds: [1511, 1512, 1513, 1514, 1516, 1517, 1518, 1519, 1520, 1522],
        author: "string"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);

    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    console.log(`${__ITER + 1},${response.timings.duration}`);

    sleep(1);
}