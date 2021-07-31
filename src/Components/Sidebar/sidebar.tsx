import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
// import { ipcRenderer } from 'electron/renderer'
import React, { BaseSyntheticEvent, FC } from 'react'
import { FiSearch } from 'react-icons/fi'
import NavItem from './Components/NavItem'

// declare const electron: string;

const Sidebar: FC = () => {
    // const [open] = useState(true)
    const handleContextMenu = (e: BaseSyntheticEvent) => {
        console.log(e.target.id)
        e.preventDefault()
        if (!e.target.id) {
            window.api.send('show-context-menu')
        } else {
            window.api.send('show-context-menu', e.target.id)
        }
    }

    return (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('inherit', 'gray.700')}
            borderRightWidth="1px"
            w="60"
            onContextMenu={(e) => handleContextMenu(e)}
            // display={{ base: 'none', md: 'unset' }}
        >
            <Flex px="4" pb="2" align="center" bg="gray.800">
                <Text
                    fontSize="14"
                    ml="2"
                    color={useColorModeValue('black', 'white')}
                >
                    Explorer
                </Text>
            </Flex>

            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="gray.900"
                aria-label="Main Navigation"
            >
                <NavItem
                    icon={FiSearch}
                    id={1337}
                    onClick={() => console.log('Clicked')}
                >
                    Working?
                </NavItem>
            </Flex>
        </Box>
    )
}

export default Sidebar
