import {Document} from './pages'
import './App.css'
import { Nav } from './components'
import { Grid, GridItem, Box} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import React from 'react';
import { getAllDocuments } from './features';
import { useDispatch, useSelector } from 'react-redux';
function App() {

  const dispatch = useDispatch();

  const {documents, currentSelectedDocument} = useSelector(state => state.documents);

  React.useEffect(() => {
    dispatch(getAllDocuments())
  },[])

  return (
    <Router>
    <Grid h={'100vh'} templateColumns="repeat(5,1fr)">
      <GridItem colSpan={1}>
        <Nav/>
      </GridItem>
      <GridItem colSpan={3}>
        <Switch>
          <Route exact path="/">
            <Document/>
          </Route>
        </Switch>
      </GridItem>
      <GridItem colSpan={1}>
        <div>
          <p>Right SideBar</p>
        </div>
      </GridItem>
    </Grid> 
    
    }
    </Router>
 )
}

export default App
