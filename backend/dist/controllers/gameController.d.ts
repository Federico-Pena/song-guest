import type { Request, Response } from 'express';
export declare const playAudio: (req: Request, res: Response) => void;
export declare const youtubeSerarch: (req: Request, res: Response) => Promise<void>;
export declare const getUserScore: (req: Request, res: Response) => Promise<void>;
