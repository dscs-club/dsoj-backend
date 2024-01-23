import { ILoginRes as ISystemRes } from "@src/models/User";


const SystemResStatus: { [name: string]: { [name: string]: ISystemRes } } = {
    NORMAL: {
        INPUT_BLANK: {
            access: false,
            status: 'I-2',
            details: 'Please input the full data.',
        }
    },
    LOGIN: {
        OK: {
            access: true,
            status: 'LA-1',
        },
        INPUT_INCORRECT: {
            access: false,
            status: 'LD-1',
            details: 'Your name or password is incorrect.'
        },
    },
    SIGNUP: {
        OK: {
            access: true,
            status: 'SA-1',
            details: 'account created',
        },
        NAME_TAKEN: {
            access: false,
            status: 'SD-1',
            details: 'This name is already taken.',
        },
    },
    SUMBIT: {
        OK: {
            access: true,
            status: 'SA-1',
            details: 'Your submission has been received.',
        },
        INPUT_INCORRECT: {
            access: false,
            status: 'SB-1',
            details: 'Your name or password is incorrect.'
        },
        INPUT_BLANK: {
            access: false,
            status: 'SB-2',
            details: 'Please input the full data.',
        },
        PROBLEM_NOT_FOUND: {
            access: false,
            status: 'SB-3',
            details: 'Problem not found.',
        },
    },
}

export default SystemResStatus;
