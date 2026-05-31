export declare const themeColorPalette: string[];
export declare function getThemeColorByIndex(index: number): string;
export declare function getRandomThemeColor(): string;
export declare function hexToRgba(hex: string, alpha?: number): string;
export declare function getContrastingTextColor(hex: string): "#102117" | "#ffffff";
export declare function getQueryByName(name: string, url?: string): string | null;
export declare function getQuery(url?: string): {
    [key: string]: string;
};
export declare function formateDate(date: Date): string;
