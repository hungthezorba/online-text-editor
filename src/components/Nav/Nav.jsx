import React from 'react';
import './Nav.module.css';
import { Button, Box, Container, Input } from '@chakra-ui/react'
import { colors } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import  {selectDocument, addDocumentThunk, updateDocumentOnClient } from '../../features/document/documentSlice';
import { documentModel } from '../../model';

async function editTitle(dispatch, doc, setEditableTitle) {
        setEditableTitle(true);
        dispatch(selectDocument(doc._id))
}

async function onChangeTitle(dispatch, currentSelectedDocument, title) {
    console.log(title);
    dispatch(updateDocumentOnClient({
        _id: currentSelectedDocument._id,
        title: title
    }))
}

async function updateTitle(doc, title, setEditableTitle) {
    let rs = await documentModel.saveDocument({
        _rev: doc._rev,
        _id: doc._id,
        content: doc.content,
        title: title,
    })
    console.log(rs);
    setEditableTitle(false)
}

function NavItem ({doc}) {
    const { currentSelectedDocument} = useSelector((state) => state.documents);
    const [editableTitle, setEditableTitle] = React.useState(false); 
    const dispatch = useDispatch(); 
    return (
        <Box>
            <Box
                cursor={'pointer'} 
                onClick={() => dispatch(selectDocument(doc._id))}
                onDoubleClick={() => editTitle(dispatch, doc, setEditableTitle)}
                py={13}
            >   
            {editableTitle?
                <Input 
                onBlur={(e) => updateTitle(currentSelectedDocument, e.target.value, setEditableTitle)}
                value={doc.title} onChange={(e) => onChangeTitle(dispatch, currentSelectedDocument, e.target.value)} /> 
                :
                <>
                    <p>{doc.title}</p>
                </>   
            }
            </Box>
            {currentSelectedDocument._id == doc._id?
                <Box w={'80%'} h={'3px'} backgroundColor={colors.PURPLE_DEFAULT}/>
                :
                null
            }
        </Box>
         
    )
}

function Nav() {
    
    const {documents} = useSelector((state) => state.documents);
    const dispatch = useDispatch();

    async function addNewDoc()  {
        let newDoc = {
            _id: Date.now().toString(),
            title: 'Untitled Document',
            content: ''
        }
        addDocumentThunk(dispatch, newDoc);
    }

    return (
        <Box position={'relative'} h={'100%'} boxShadow={`5px 0px 0px ${colors.PURPLE_LIGHT}`}>
            <Container paddingY={4} marginLeft={4}>
             <Box>
                <p>YOUR DOCUMENTS</p>
                <Box backgroundColor={colors.PURPLE_DEFAULT} h={1} w={'50%'}/>
            </Box>
            
            <Box mt={8}>
                {documents?.map(doc => (
                    <NavItem
                        key={doc._id}
                        doc={doc}
                    />
               ))}
            </Box>
            <Box mt={5}>
                <Button 
                    onClick={() => addNewDoc()}
                >
                    Add new document
                </Button>
            </Box>
            </Container>
       </Box>
    )
}

export default Nav;