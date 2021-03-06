// Copyright 2020, Rachel Phuong

import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;