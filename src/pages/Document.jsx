import React from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import {ContentState, Editor, EditorState} from 'draft-js';
import { useSelector, useDispatch } from 'react-redux';
import { add, clear } from '../features/keyComp/keyCommandSlice';
import { updateDocumentOnClient, addDocumentThunk, updateCurrentSelectedDocument } from '../features/document/documentSlice';
import { documentModel } from '../model';
import { keyBind, saveStatus } from '../constants';
import { SaveStatus } from '../components';

async function assignSaveDoc(dispatch, currentSelectedDocument, contentValue) {

    let dbResult = await documentModel.saveDocument({
        _rev: currentSelectedDocument._rev,
        _id: currentSelectedDocument._id,
        title: currentSelectedDocument.title,
        content: contentValue
    })
    if (dbResult) {
        dispatch(updateDocumentOnClient({
            _id: currentSelectedDocument._id,
            content: contentValue
        }))
    } 
}

function Document (props) {

    const {currentSelectedDocument, documents} = useSelector(state => state.documents);
    const { isAutoSave } = useSelector(state => state.isAutoSave);
    const dispatch  = useDispatch();

    const [content, setContent] = React.useState(EditorState.createWithContent(ContentState.createFromText(currentSelectedDocument.content)));
    const {keyCommand} = useSelector((state) => state.keyCommand);
    const [isSaving, setIsSaving] = React.useState(false);
    const [saveInterval, setSaveInterval] = React.useState();

    React.useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault()
                dispatch(add(e.key));
            } 
            return true;
        })
        document.addEventListener('keyup', (e) => {
            dispatch(clear());
        })
    }, [])
    
    React.useEffect(() => {
        let contentValue = content.getCurrentContent().getPlainText();
        if (keyCommand.includes(keyBind.SAVE_MACOS) || keyCommand.includes(keyBind.SAVE_WINDOWS)) {
            if (saveInterval) {
                clearTimeout(saveInterval);
            }
            setIsSaving(true)
            setSaveInterval(setTimeout(() => {
                setIsSaving(false);
                assignSaveDoc(dispatch, currentSelectedDocument, contentValue);
            }, 2000))
           
            dispatch(clear());
        }
    }, [keyCommand])

    React.useEffect(() => {
        let contentValue = content.getCurrentContent().getPlainText();

        if (documents?.length == 0 && contentValue != '') {
            let newDoc = {
                _id: Date.now().toString(),
                title: 'Untitled Document',
                content: contentValue
            }
            addDocumentThunk(dispatch, newDoc);
        }
        // Auto Save
        if (currentSelectedDocument._id != '' && isAutoSave) {
            if (saveInterval) {
                clearTimeout(saveInterval);
            }
            setIsSaving(true)
            setSaveInterval(setTimeout(() => {
                assignSaveDoc(dispatch, currentSelectedDocument, contentValue)
                .then((res) => {
                    setIsSaving(false);
                })
            }, 2000))
        }
    }, [content.getCurrentContent().getPlainText()])

    React.useEffect(() => {
        if (currentSelectedDocument) {
            setContent(EditorState.moveFocusToEnd(EditorState.createWithContent(ContentState.createFromText(currentSelectedDocument.content))))
        }
    },[currentSelectedDocument._id])

    return (
        <Box p={10}>                       
            {documents?.length == 0?
                <Editor 
                    placeholder={documents?.length == 0 && 'No document found. Type something down here...' }
                    editorState={content} 
                    onChange={(e) => setContent(e)} />    
                :
                <>
                {currentSelectedDocument._id != ''?
                <Box>
                    {isAutoSave?
                        <>
                            {isSaving?
                                <SaveStatus status={saveStatus.SAVING}/>
                                :
                                <SaveStatus status={saveStatus.UP_TO_DATE}/>
                            }
                        </>
                        :
                        <>
                            {isSaving?
                                <SaveStatus status={saveStatus.SAVING}/>
                                :
                                <>
                                {currentSelectedDocument.content == content.getCurrentContent().getPlainText()?
                                <SaveStatus status={saveStatus.UP_TO_DATE}/>
                                    :
                                <SaveStatus status={saveStatus.NOT_SAVED}/>
                                }
                                </>
                            }
                        </>   
                    }                    
                    <Editor
                        editorState={content} 
                        onChange={(e) => setContent(e)}
                    />    
                    </Box>
                    :
                    <p>Select a document to edit or create a new one</p>                
                }
                </>
            }
        </Box>
    )
}

export default Document;