export const SET_ACTIVITY = 'SET_ACTIVITY';
export const SET_PREVIOUS_ACTIVITY = 'SET_PREVIOUS_ACTIVITY';
export const SET_QR_DATA = 'SET_QR_DATA';

export const setActivity = (activity) => ({
    type: SET_ACTIVITY,
    payload: activity
});

export const setPreviousActivity = (activity) => ({
    type: SET_PREVIOUS_ACTIVITY,
    payload: activity
});

export const setQRData = (data) => ({
    type: SET_QR_DATA,
    payload: data
});
