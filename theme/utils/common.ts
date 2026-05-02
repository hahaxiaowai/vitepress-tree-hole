export const themeColorPalette = [
  "#e15b64",
  "#f47e60",
  "#f8b26a",
  "#abbd81",
  "#849b87",
  "#f26d6d",
  "#67cc86",
  "#fb9b5f",
  "#3498db",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

export function getThemeColorByIndex(index: number) {
  return themeColorPalette[index % themeColorPalette.length];
}

export function getRandomThemeColor() {
  return getThemeColorByIndex(Math.floor(Math.random() * themeColorPalette.length));
}

function normalizeHex(hex: string) {
  const value = hex.trim().replace(/^#/, "");
  if (value.length === 3) {
    return value.split("").map(char => `${char}${char}`).join("");
  }
  return value.length === 6 ? value : "30a46c";
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex);
  const numeric = Number.parseInt(normalized, 16);

  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  };
}

export function hexToRgba(hex: string, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

function getRelativeLuminanceChannel(value: number) {
  const channel = value / 255;
  return channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

export function getContrastingTextColor(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const luminance
    = (0.2126 * getRelativeLuminanceChannel(r))
      + (0.7152 * getRelativeLuminanceChannel(g))
      + (0.0722 * getRelativeLuminanceChannel(b));

  return luminance > 0.55 ? "#102117" : "#ffffff";
}

function getLocationHref() {
  return typeof window === "undefined" ? "" : window.location.href;
}

function getLocationSearch() {
  return typeof window === "undefined" ? "" : window.location.search;
}

export function getQueryByName(name: string, url = getLocationHref()) {
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function getQuery(url: string = getLocationHref()) {
  url = url || getLocationSearch();
  if (!url) {
    return {};
  }

  const obj: { [key: string]: string } = {};
  const arr = url.match(/[?&][^?&]+=[^?&#]+/g);
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
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
