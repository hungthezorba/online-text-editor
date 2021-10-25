import React from 'react';
import './Nav.module.css';
import data from '../../data/documents.json';
import { Button, Box, Container } from '@chakra-ui/react'
import { colors } from '../../constants';

function Nav() {
    
    const [documents, setDocuments] = React.useState(data);    
    
    return (

        <Box position={'relative'} h={'100%'} boxShadow={'5px 0px 0px rgba(0,0,0,0.25)'}>
            <Container paddingY={4} marginLeft={4}>
             <Box>
                <p>Your documents</p>
                <Box backgroundColor={colors.GRAY_LIGHT} h={1} w={'30%'}/>
            </Box>
            <Box mt={8}>
                {documents?.map(d => (
                    <Box cursor={'pointer'} _hover={{backgroundColor: colors.GRAY_LIGHT}} backgroundColor={d.id == '1'? colors.GRAY_LIGHTER : colors.GRAY_LIGHTEST} p={13} key={d.id}>
                        <p>{d.name}</p>
                    </Box>
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