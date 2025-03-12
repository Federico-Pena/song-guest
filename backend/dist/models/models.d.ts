import mongoose from 'mongoose';
export declare const GameModel: mongoose.Model<{
    players: mongoose.Types.DocumentArray<{
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    categories: mongoose.Types.DocumentArray<{
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    players: mongoose.Types.DocumentArray<{
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    categories: mongoose.Types.DocumentArray<{
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    players: mongoose.Types.DocumentArray<{
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    categories: mongoose.Types.DocumentArray<{
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    players: mongoose.Types.DocumentArray<{
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    categories: mongoose.Types.DocumentArray<{
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    players: mongoose.Types.DocumentArray<{
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    categories: mongoose.Types.DocumentArray<{
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
}>> & mongoose.FlatRecord<{
    players: mongoose.Types.DocumentArray<{
        name: string;
        idGoogle: string;
        picture: string;
        points: number;
        ready: boolean;
        attempt: number;
        idGame?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    categories: mongoose.Types.DocumentArray<{
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            id: string;
            title: string;
            thumbnail: string;
        }> & {
            id: string;
            title: string;
            thumbnail: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        name: "Spanish Rock" | "English Rock" | "Pop" | "Hip-Hop" | "Latina" | "Baladas";
        players: any[];
        idList: string;
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
        items: mongoose.Types.DocumentArray<{
            id: string;
            title: string;
            thumbnail: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const UserScoreModel: mongoose.Model<{
    name: string;
    idGoogle: string;
    picture: string;
    points: number;
    games: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    idGoogle: string;
    picture: string;
    points: number;
    games: number;
}> & {
    name: string;
    idGoogle: string;
    picture: string;
    points: number;
    games: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    idGoogle: string;
    picture: string;
    points: number;
    games: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    idGoogle: string;
    picture: string;
    points: number;
    games: number;
}>> & mongoose.FlatRecord<{
    name: string;
    idGoogle: string;
    picture: string;
    points: number;
    games: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
