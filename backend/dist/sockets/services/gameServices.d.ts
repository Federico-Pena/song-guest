import type { Server } from 'socket.io';
import type { GameModelDB } from '../../types.js';
export declare const countdown: (contextGame: GameModelDB, time: number, isFullScreen: boolean, io: Server) => Promise<void>;
