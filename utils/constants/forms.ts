export enum EFormStatus {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

export const REDIRECT_DELAY = 5;

export const STATUS_DICT = {
    [EFormStatus.Success]: {
        title: 'Success!',
        desc: 'Your post has been created successfully.',
    },
    [EFormStatus.Error]: {
        title: 'Error!',
        desc: 'Something went wrong. Please try again later.',
    },
};
