import React from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import {ContentState, Editor, EditorState} from 'draft-js';
import { useSelector, useDispatch } from 'react-redux';
import { add, clear } from '../features/keyComp/keyCommandSlice';
import { selectDocument, updateCurrentSelectedDocument, updateDocumentsDB } from '../features/document/documentSlice';

const SAVE_KEYBIND_MACOS = 'Metas';
const SAVE_KEYBIND_WINDOWS = 'Controls';

function Document (props) {

    const {currentSelectedDocument, documents} = useSelector(state => state.documents);

    const dispatch  = useDispatch();

    const [content, setContent] = React.useState(EditorState.createWithContent(ContentState.createFromText('')));
    const {keyCommand} = useSelector((state) => state.keyCommand);   

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
        if (props.document?.id) {
            dispatch(selectDocument(props.document))
        }
    }, [])
    
    React.useEffect(() => {
        if (keyCommand.includes(SAVE_KEYBIND_MACOS) || keyCommand.includes(SAVE_KEYBIND_WINDOWS)) {
            console.log('Document saved');
            dispatch(clear());
        }
    }, [keyCommand])

    React.useEffect(() => {
        let contentValue = content.getCurrentContent().getPlainText()
        // dispatch(updateCurrentSelectedDocument(contentValue));
        if (props.document) {
            dispatch(updateDocumentsDB({
                id: props.document.id,
                title: contentValue
            }))
        }        
    }, [content])

    React.useEffect(() => {
    if (props.document?.title) {
            setContent(EditorState.createWithContent(ContentState.createFromText(props.document?.title)))
        }
    },[currentSelectedDocument.id])

    return (
        <Box p={10}>
            <Editor editorState={content} onChange={(e) => setContent(e)}/>    
        </Box>
    )
}

export default Document;