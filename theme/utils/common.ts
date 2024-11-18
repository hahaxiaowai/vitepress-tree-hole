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
export function getQueryByName(name: string, url = window.location.href) {
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function getQuery(url: string = window.location.href) {
  url = url || window.location.search;
  const obj: { [key: string]: string } = {};
  const arr = url.match(new RegExp("[?&][^?&]+=[^?&#]+", "g"));
  if (arr && arr.length) {
    arr.forEach((item) => {
      const x = item.substring(1).split("=");
      const key = decodeURIComponent(x[0]);
      if (!obj[key]) {
        const val = decodeURIComponent(x[1]);
        obj[key] = val;
      }
    });
  }
  return obj;
}
export function formateDate(date: Date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}
