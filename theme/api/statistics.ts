import request from "../utils/request";

export function getStats(
  id: string,
  url: string,
  token: string,
  startAt: string | number
): Promise<{ pageviews: { value: number }; visitors: { value: number } }> {
  const uri =
    process.env.NODE_ENV === "production"
      ? url + `/api/websites/${id}/stats`
      : `/api/websites/${id}/stats`;
  return request({
    url: uri,
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
export function getActive(
  id: string,
  url: string,
  token: string
): Promise<{ x: number }> {
  const uri =
    process.env.NODE_ENV === "production"
      ? url + `/api/websites/${id}/active`
      : `/api/websites/${id}/active`;
  return request({
    url: uri,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
