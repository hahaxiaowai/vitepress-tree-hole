export function getRandomThemeColor() {
  const colorArr: string[] = [
    "#e15b64",
    "#f47e60",
    "#f8b26a",
    "#abbd81",
    "#849b87",
    "#e15b64",
    "#f47e60",
    "#f8b26a",
    "#f26d6d",
    "#67cc86",
    "#fb9b5f",
    "#3498db",
  ];
  const index = Math.floor(Math.random() * colorArr.length);
  return colorArr[index];
}
export function getQueryByName(name:string, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function getQuery(url:string = window.location.href) {
  url = url || window.location.search;
  const obj = {};
  const arr = url.match(new RegExp('[?&][^?&]+=[^?&#]+', 'g'));
  if (arr && arr.length) {
    arr.forEach((item) => {
      const x = item.substring(1).split('=');
      const key = decodeURIComponent(x[0]);
      if (!obj[key]) {
        const val = decodeURIComponent(x[1]);
        obj[key] = val;
      }
    });
  }
  return obj;
}