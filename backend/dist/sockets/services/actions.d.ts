import type { Server, Socket } from 'socket.io';
import type { EventsMap } from '../../types.js';
export declare const updateAttemptController: (data: EventsMap["updateAttempt"], socket: Socket, io: Server) => Promise<void>;
export declare const togglePlayPauseController: (data: EventsMap["togglePlayPause"], socket: Socket, io: Server) => Promise<void>;
export declare const toggleReadyController: (data: EventsMap["toggleReady"], socket: Socket, io: Server) => Promise<void>;
export declare const voteCategoryController: (data: EventsMap["voteCategory"], socket: Socket, io: Server) => Promise<void>;
export declare const startGameController: (data: EventsMap["startGame"], socket: Socket, io: Server) => Promise<void>;
export declare const resetGameController: (data: EventsMap["resetGame"], socket: Socket, io: Server) => Promise<void>;
