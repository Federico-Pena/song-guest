import type { Player } from '../../types.js';
export declare const deleteUserFromDb: (user: Player) => Promise<boolean>;
export declare const addUserToDb: (user: Player, gameId: string) => Promise<(import("mongoose").Document<unknown, {}, {
    players: import("mongoose").Types.DocumentArray<{
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }> & {
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }>;
    attempt: number;
    host: string;
    winner: string;
    isPlaying: boolean;
    videoTitle: string;
    categories: import("mongoose").Types.DocumentArray<{
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }> & {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }>;
    categorySelected: {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    };
    state: "waiting" | "in-progress" | "finished";
}> & {
    players: import("mongoose").Types.DocumentArray<{
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }> & {
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }>;
    attempt: number;
    host: string;
    winner: string;
    isPlaying: boolean;
    videoTitle: string;
    categories: import("mongoose").Types.DocumentArray<{
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }> & {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }>;
    categorySelected: {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    };
    state: "waiting" | "in-progress" | "finished";
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}) | null | undefined>;
export declare const updateUserInDb: (user: Player) => Promise<(import("mongoose").Document<unknown, {}, {
    players: import("mongoose").Types.DocumentArray<{
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }> & {
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }>;
    attempt: number;
    host: string;
    winner: string;
    isPlaying: boolean;
    videoTitle: string;
    categories: import("mongoose").Types.DocumentArray<{
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }> & {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }>;
    categorySelected: {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    };
    state: "waiting" | "in-progress" | "finished";
}> & {
    players: import("mongoose").Types.DocumentArray<{
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }> & {
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }>;
    attempt: number;
    host: string;
    winner: string;
    isPlaying: boolean;
    videoTitle: string;
    categories: import("mongoose").Types.DocumentArray<{
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }> & {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }>;
    categorySelected: {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: import("mongoose").Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    };
    state: "waiting" | "in-progress" | "finished";
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}) | null | undefined>;
export declare const cleanEmptyRooms: () => Promise<void>;
