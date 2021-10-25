import {Home} from './pages'
import './App.css'
import { Nav } from './components'
import { Grid, GridItem} from '@chakra-ui/react';

function App() {

  return (
    <Grid h={'100vh'} templateColumns="repeat(5,1fr)">
      <GridItem colSpan={1}>
        <Nav/>
      </GridItem>
      <GridItem colSpan={3}>
        <Home/>
      </GridItem>
      <GridItem colSpan={1}>
        <div>
          <p>Right SideBar</p>
        </div>
      </GridItem>
    </Grid> 
 )
}

export default App
