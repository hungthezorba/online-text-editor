import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import {Fonts} from "./Fonts"
const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Space Mono",
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />    
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
