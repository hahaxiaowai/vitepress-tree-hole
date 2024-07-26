import axios from 'axios';
const errorCodeType = function (code: number) {
  let errMessage: string = "未知错误";
  switch (code) {
    case 400:
      errMessage = "错误的请求";
      break;
    case 401:
      errMessage = "未授权，请重新登录";
      break;
    case 403:
      errMessage = "拒绝访问";
      break;
    case 404:
      errMessage = "请求错误,未找到该资源";
      break;
    case 405:
      errMessage = "请求方法未允许";
      break;
    case 408:
      errMessage = "请求超时";
      break;
    case 500:
      errMessage = "服务器端出错";
      break;
    case 501:
      errMessage = "网络未实现";
      break;
    case 502:
      errMessage = "网络错误";
      break;
    case 503:
      errMessage = "服务不可用";
      break;
    case 504:
      errMessage = "网络超时";
      break;
    case 505:
      errMessage = "http版本不支持该请求";
      break;
    default:
      errMessage = `其他连接错误 --${code}`;
  }
  return errMessage;
};
// 创建axios实例
const service = axios.create({
  // 超时设置
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    if (config.method === 'get' && config.params) {
      let url = config.url + '?';
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        var part = encodeURIComponent(propName) + '=';
        if (value !== null && typeof value !== 'undefined') {
          // 对象处理
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              let params = propName + '[' + key + ']';
              var subPart = encodeURIComponent(params) + '=';
              url += subPart + encodeURIComponent(value[key]) + '&';
            }
          } else {
            url += part + encodeURIComponent(value) + '&';
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    console.error(error);
    Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data['code'] || 200;
    // 获取错误信息
    const msg = errorCodeType(code);
    if (code === 200) {
    return Promise.resolve(res.data);
    } else {
    return Promise.reject(msg);
    }
  },
  (error) => {
    if (error.message == 'Network Error') {
      error.message = '接口异常';
    } else if (error.message.includes('timeout')) {
      error.message = '请求超时';
    } else if (error.message.includes('Request failed with status code')) {
      error.message =
        '接口' + error.message.substr(error.message.length - 3) + '异常';
    }
    return Promise.reject(error);
  },
);

export default service;
