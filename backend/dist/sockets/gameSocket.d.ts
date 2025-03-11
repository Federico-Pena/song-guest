import { Server } from 'socket.io';
import type { EventNamesConst } from '../types.js';
export declare const gameSocket: (io: Server) => Promise<void>;
export declare const EVENT_NAMES: EventNamesConst;
