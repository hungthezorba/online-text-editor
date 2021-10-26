import {configureStore} from '@reduxjs/toolkit';
import {documentReducer, keyCommandReducer} from '../features';

export const store = configureStore({
    reducer: {
        documents: documentReducer,
        keyCommand: keyCommandReducer 
    },
})