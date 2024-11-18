/* eslint-disable node/prefer-global/process */
import request from "../utils/request";


export function getMemoList(
  page: number,
  filter1: string,
  filter2: string,
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
      username
    }
  });
}
