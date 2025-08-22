// docker run --rm -it -v ${PWD}:/scripts -e K6_LOG_LEVEL=info grafana/k6 run /scripts/event_report_test.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,           // 동시 VU 1명만 실행
    iterations: 50,   // 총 50번 실행
};

export default function () {
    const url = `${backend_url}/api/v1/report/create-event`;

    const payload = JSON.stringify({
        "startTime": "2025-07-21T00:00:00.00",
        "endTime": "2025-07-21T23:59:59.99",
        "author": "string"
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