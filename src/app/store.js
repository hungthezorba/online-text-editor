import {configureStore} from '@reduxjs/toolkit';
import {autoSaveReducer, documentReducer, keyCommandReducer} from '../features';

export const store = configureStore({
    reducer: {
        documents: documentReducer,
        keyCommand: keyCommandReducer,
        isAutoSave: autoSaveReducer 
    },
})