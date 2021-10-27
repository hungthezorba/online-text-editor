import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { switchAutoSave } from '../../features/autoSave/autoSaveSlice';
import { Box, Stack, Switch } from '@chakra-ui/react'

function RightSideBar() {

    const {isAutoSave} = useSelector((state) => state.isAutoSave);
    const dispatch = useDispatch();

    return (
        <Box mt={4} p={5}>
            <Stack align="center" direction="row">
                <Switch isChecked={isAutoSave} onChange={() => dispatch(switchAutoSave())} size="sm" />
                <p>Auto save</p>
            </Stack>
            <Stack mt={10}>
                <p>Online text editor with pouchDB</p>
            </Stack>
        </Box>
    )
}

export default RightSideBar;