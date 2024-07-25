import request from "../utils/request";
export function login() {
  return request({
    url: `/api/auth/login`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      username: import.meta.env.VITE_USERNAME,
      password: import.meta.env.VITE_PASSWORD,
    }),
  });
}
export function getStats(
  token: string,
  startAt: string | number = "1718648303000"
): Promise<{ pageviews: { value: number }; visitors: { value: number } }> {
  return request({
    url: `/api/websites/f5a8ac77-caa7-4c9e-b100-c6e030ea77a7/stats`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
      // 'Content-Type': 'application/json',
    },
    params: {
      startAt,
      endAt: Date.now(),
    },
  });
}
export function getActive(token: string): Promise<{ x: number }> {
  return request({
    url: `/api/websites/f5a8ac77-caa7-4c9e-b100-c6e030ea77a7/active`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
