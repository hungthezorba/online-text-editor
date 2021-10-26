import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import { documentAPI } from '../../apis';
import { documentModel } from '../../model';

export const getAllDocuments = createAsyncThunk(
    'documents/getAllDocuments',
    async () => {
        let documents = documentModel.getAllDocuments();
        return documents;
    }
)

export const documentSlice = createSlice({
  name: 'document',
  initialState: {
      documents: [],
      currentSelectedDocument: {
        id: '',
        title: '',
        content: ''
      },
      loading: false
  },
  reducers: {
    updateCurrentSelectedDocument: (state, action) => {
        state.currentSelectedDocument.title = action.payload
    },
    selectDocument: (state, action) => {
        state.currentSelectedDocument = state.documents.find((doc) => {return doc.id == action.payload})  
    },
    addDocument: (state, action) => {
        state.documents.push(action.payload);
    },
    updateDocumentsDB: (state, action) => {
        const doc = state.documents.find((doc) => {return doc.id == action.payload.id})
        if (doc) {
            Object.assign(doc, action.payload);
        }
        console.log(doc);
    }
  },
  extraReducers: {
      [getAllDocuments.fulfilled]: (state, actions) => {
          state.documents = actions.payload
      }
  }
})

export const {updateCurrentSelectedDocument, addDocument, selectDocument, updateDocumentsDB} = documentSlice.actions

export default documentSlice.reducer