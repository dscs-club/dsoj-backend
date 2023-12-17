import EnvVars from '@src/constants/EnvVars';
import fs from 'fs';
import { ISubmitRequest, ISumbitionResult } from '@src/models/Submission';

export interface JudgeResult {
    executionTime: number;
    executionMemory: number;
    result: string;
}

export interface JudgeTask {
    stdin: string;
    stdout: string;
}

export class JudgeTask {
    public subTasks: JudgeTask[] = [];
    constructor(req: ISubmitRequest) {
        // get subtask data
        fs.readdir(`${EnvVars.judge.TasksPath}/tasks/${req.problemId}/`, (err, subtask_list) => {
            if (err) throw err;
            console.log(subtask_list);
        })
    }
}