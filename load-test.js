import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // 부하 테스트 시나리오 설정
  stages: [
    { duration: '10s', target: 20 }, // 처음 10초 동안 가상 유저(VU)를 20명까지 늘림 (Ramp-up)
    { duration: '30s', target: 20 }, // 30초 동안 20명의 유저 유지
    { duration: '10s', target: 0 },  // 마지막 10초 동안 유저를 0명으로 줄임 (Ramp-down)
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95%의 요청이 500ms 이내에 완료되어야 함 (성공 기준)
  },
};

export default function () {
  // 1. 게시글 목록 조회 API 호출 (JSON 응답) - 페이지네이션 적용 (1페이지, 20개)
  const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';
  const res = http.get(`${BASE_URL}/api/board/list?page=0&size=20`);

  // 디버깅: 상태 코드가 200이 아니면 로그 출력
  if (res.status !== 200) {
      console.log(`❌ Error: Status ${res.status}, Body: ${res.body}`);
  }

  // 2. 응답 확인 (상태 코드가 200 OK 인지 검증)
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // 3. 유저 간의 행동 딜레이 (1초 대기)
//  sleep(1);
}
