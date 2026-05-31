import request from "../utils/request";
export function getMemoList(page, filters, url, username, token) {
    return request({
        url,
        method: "get",
        params: {
            page,
            token,
            filters,
            username,
        },
    });
}
