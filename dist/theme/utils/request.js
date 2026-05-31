import axios from "axios";
function getErrorMessageByCode(code) {
    let errorMessage = "未知错误";
    switch (code) {
        case 400:
            errorMessage = "错误的请求";
            break;
        case 401:
            errorMessage = "未授权，请重新登录";
            break;
        case 403:
            errorMessage = "拒绝访问";
            break;
        case 404:
            errorMessage = "请求错误，未找到该资源";
            break;
        case 405:
            errorMessage = "请求方法未允许";
            break;
        case 408:
            errorMessage = "请求超时";
            break;
        case 500:
            errorMessage = "服务器端出错";
            break;
        case 501:
            errorMessage = "网络未实现";
            break;
        case 502:
            errorMessage = "网络错误";
            break;
        case 503:
            errorMessage = "服务不可用";
            break;
        case 504:
            errorMessage = "网络超时";
            break;
        case 505:
            errorMessage = "HTTP 版本不支持该请求";
            break;
        default:
            errorMessage = `其他连接错误 --${code}`;
    }
    return errorMessage;
}
function stringifyGetParams(config) {
    if (config.method !== "get" || !config.params) {
        return config;
    }
    const searchParams = new URLSearchParams();
    Object.entries(config.params).forEach(([key, value]) => {
        if (value === null || typeof value === "undefined") {
            return;
        }
        if (typeof value === "object" && !Array.isArray(value)) {
            Object.entries(value).forEach(([subKey, subValue]) => {
                if (subValue === null || typeof subValue === "undefined") {
                    return;
                }
                searchParams.append(`${key}[${subKey}]`, String(subValue));
            });
            return;
        }
        searchParams.append(key, String(value));
    });
    const url = config.url ?? "";
    const query = searchParams.toString();
    config.params = {};
    config.url = query ? `${url}?${query}` : url;
    return config;
}
const service = axios.create({
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
});
service.interceptors.request.use((config) => {
    return stringifyGetParams(config);
}, (error) => {
    console.error(error);
    return Promise.reject(error);
});
service.interceptors.response.use((response) => {
    const code = response.data.code ?? 200;
    if (code === 200) {
        return Promise.resolve(response.data);
    }
    return Promise.reject(getErrorMessageByCode(code));
}, (error) => {
    if (error instanceof Error) {
        if (error.message === "Network Error") {
            error.message = "接口异常";
        }
        else if (error.message.includes("timeout")) {
            error.message = "请求超时";
        }
        else if (error.message.includes("Request failed with status code")) {
            error.message = `接口${error.message.slice(-3)}异常`;
        }
    }
    return Promise.reject(error);
});
export default service;
