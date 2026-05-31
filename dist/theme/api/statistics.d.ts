export declare function getStats(id: string, url: string, token: string, startAt: string | number): Promise<{
    pageviews: {
        value: number;
    };
    visitors: {
        value: number;
    };
}>;
export declare function getActive(id: string, url: string, token: string): Promise<{
    x: number;
}>;
