import './wdyr';
import {Document} from './pages'
import './App.css'
import { Nav } from './components'
import { Grid, GridItem, Box} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import React from 'react';
import { getAllDocuments } from './features/document/documentSlice';
import { useDispatch, useSelector } from 'react-redux';
import RightSideBar from './components/RightSideBar/RightSideBar';
const App = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllDocuments())
  },[])

  return (
    <Grid h={'100vh'} templateColumns="repeat(5,1fr)">
      <GridItem colSpan={1}>
        <Nav/>
      </GridItem>
      <GridItem colSpan={3}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Document/>
            </Route>
          </Switch>
        </Router>
      </GridItem>
      <GridItem colSpan={1}>
        <RightSideBar/>
      </GridItem>
    </Grid>
  )
}

App.whyDidYouRender = true

export default App
