import { createStore } from 'redux';
import activityReducer from './reducers';

const store = createStore(activityReducer);

export default store;
