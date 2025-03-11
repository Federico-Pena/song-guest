import type { Server, Socket } from 'socket.io';
import type { EventsMap } from '../../types.js';
export declare const loginController: (data: EventsMap["login"], socket: Socket) => Promise<void>;
export declare const createRoomController: (data: EventsMap["createRoom"], socket: Socket, io: Server) => Promise<void>;
export declare const leaveRoomController: (data: EventsMap["leaveRoom"], socket: Socket, io: Server) => Promise<void>;
export declare const joinRoomController: (data: EventsMap["joinRoom"], socket: Socket, io: Server) => Promise<void>;
