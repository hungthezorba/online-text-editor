import React from 'react';
import {Box, Text} from '@chakra-ui/react';

function SaveStatus({status}) {
    return (
        <Box display={'flex'} alignItems={'center'}>
            <Box h={3} w={3} borderRadius={50} backgroundColor={status.color}/>
            <Text ml={2}>{status.text}</Text>
        </Box>
    )
}

export default SaveStatus;