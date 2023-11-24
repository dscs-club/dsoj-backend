export interface ISumbitionResult { 
    id: number;
    problemId: number;
    userId: number;
    code: string;
    language: string;
    status: string;
    time: number;
    memory: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISubmitRequest {
    problemId: number;
    code: string;
    language: string;
    userId: number;
}

