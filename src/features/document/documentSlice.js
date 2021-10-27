import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import { documentAPI } from '../../apis';
import { documentModel } from '../../model';

export const getAllDocuments = createAsyncThunk(
    'documents/getAllDocuments',
    async () => {
            let documents = await documentModel.getAllDocuments();
            return documents;
       }
)

export const documentSlice = createSlice({
  name: 'document',
  initialState: {
      documents: [],
      currentSelectedDocument: {
        _id: '',
        title: '',
        content: ''
      },
      loading: false
  },
  reducers: {
    updateCurrentSelectedDocument: (state, action) => {
        state.currentSelectedDocument = Object.assign(state.currentSelectedDocument, action.payload);
    },
    selectDocument: (state, action) => {
        state.currentSelectedDocument = state.documents.find((doc) => {return doc._id == action.payload}) 
    },
    addDocument: (state, action) => {
        state.documents.push(action.payload); 
    },
    updateDocumentOnClient: (state, action) => {
        const doc = state.documents.find((doc) => {return doc._id == action.payload._id})
        if (doc) {
            Object.assign(doc, action.payload);
            state.currentSelectedDocument = Object.assign(state.currentSelectedDocument, action.payload);
        }
    }
  },
  extraReducers: {
      [getAllDocuments.fulfilled]: (state, actions) => {
          state.documents = actions.payload
      }
  }
})

export const {updateCurrentSelectedDocument, selectDocument, updateDocumentOnClient} = documentSlice.actions

export async function addDocumentThunk(dispatch, doc) {
    await documentModel.saveDocument(doc);
    dispatch(documentSlice.actions.addDocument(doc));
    dispatch(selectDocument(doc._id));
}

export default documentSlice.reducer