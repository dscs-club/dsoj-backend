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
        }
    }

}

export default SystemResStatus;
