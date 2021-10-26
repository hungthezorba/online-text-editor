import React from 'react';
import './Nav.module.css';
import { Button, Box, Container, Link } from '@chakra-ui/react'
import { colors } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RRLink, useParams} from 'react-router-dom';
import { selectDocument } from '../../features/document/documentSlice';

function Nav() {
    
    const {documents, currentSelectedDocument} = useSelector((state) => state.documents);
    const dispatch = useDispatch();

    return (
        <Box position={'relative'} h={'100%'} boxShadow={'5px 0px 0px rgba(0,0,0,0.25)'}>
            <Container paddingY={4} marginLeft={4}>
             <Box>
                <p>Your documents</p>
                <Box backgroundColor={colors.GRAY_LIGHT} h={1} w={'30%'}/>
            </Box>
            <Box mt={8}>
                {documents?.map(d => (
                    <Link
                        as={RRLink}
                        to={`${d.id}`}
                        key={d.id}
                        onClick={() => dispatch(selectDocument(d.id))}
                    >
                        <Box
                            cursor={'pointer'} 
                            _hover={{backgroundColor: colors.GRAY_LIGHT}} 
                            backgroundColor={d.id == currentSelectedDocument.id? colors.GRAY_LIGHTER : colors.GRAY_LIGHTEST} 
                            p={13} 
                        >
                        <p>{d.title}</p>
                        </Box>
                    </Link>
                ))}
            </Box>
            <Box mt={5}>
                <Button>
                    Add new document
                </Button>
            </Box>
            </Container>
       </Box>
    )
}

export default Nav;