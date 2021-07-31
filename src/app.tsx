import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import NewConnection from './Components/CreateDialog/newConnection'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar/sidebar'

import theme from './theme'

declare global {
    interface Window {
        api?: any
    }
}

function render() {
    ReactDOM.render(
        <ChakraProvider theme={theme}>
            <Sidebar />
            <NewConnection />
            <Header />
        </ChakraProvider>,

        document.getElementById('app')
    )
}

render()
