import type { Request, Response, NextFunction } from 'express';
export declare const logger: (staticFiles: boolean) => (req: Request, res: Response, next: NextFunction) => void;
export declare const setColorText: (color: string, text: string) => string;
export declare const setColorStatusCode: (statusCode: number) => string;
export declare const setColorMethod: (method: string) => string;
export declare const colors: {
    reset: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
};
