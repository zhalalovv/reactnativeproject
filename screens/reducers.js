import { SET_ACTIVITY, SET_PREVIOUS_ACTIVITY, SET_QR_DATA } from './actions';

const initialState = {
    activity: '',
    previousActivity: '',
    qrData: ''
};

function activityReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVITY:
            return { ...state, activity: action.payload };
        case SET_PREVIOUS_ACTIVITY:
            return { ...state, previousActivity: action.payload };
        case SET_QR_DATA:
            return { ...state, qrData: action.payload };
        default:
            return state;
    }
}

export default activityReducer;