/* eslint-disable node/prefer-global/process */
import request from "../utils/request";


export function getMemoList(
  page: number,
  filters: string,
  url: string,
  username: string,
  token: string,
): Promise<any> {
  return request({
    url,
    method: "get",
    params: {
      page,
      token,
      filters,
      username
    }
  });
}
