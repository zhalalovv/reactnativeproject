import { createStore } from 'redux';
import activityReducer from './redux/reducers';

const store = createStore(activityReducer);

export default store;
