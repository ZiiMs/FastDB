import {
    Box,
    Collapse,
    Flex,
    Icon,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
// import { ipcRenderer } from 'electron/renderer'
import React, { BaseSyntheticEvent, FC, useEffect, useState } from 'react'
import { DiMongodb } from 'react-icons/di'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { ConnectionInfo } from '../../interfaces/data'
import { Databases } from '../../interfaces/fetchDbs'
import NavItem from './Components/NavItem'

// declare const electron: string;

const Sidebar: FC = () => {
    // const [open] = useState(true)
    const [openId, setOpenId] = useState<number | null>(null)
    const [dbs, setDbs] = useState<ConnectionInfo[]>([])
    const handleContextMenu = (e: BaseSyntheticEvent) => {
        console.log(e.target.id)
        e.preventDefault()
        if (!e.target.id) {
            window.api.send('show-context-menu')
        } else {
            window.api.send('show-context-menu', e.target.id)
        }
    }

    const handleClick = (id: number) => {
        console.log(`Clicked: ${id}`)
        if (openId === id) {
            setOpenId(null)
        } else {
            setOpenId(id)
        }
    }

    useEffect(() => {
        window.api.on('fetchDbs', (databases: ConnectionInfo) => {
            setDbs((oldArray) => [...oldArray, databases])
        })
    }, [])

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
                {dbs.map((v: ConnectionInfo, id: number) => {
                    const open = openId === id
                    const rotation = open ? 'rotate(90deg)' : undefined
                    return (
                        <>
                            <NavItem
                                icon={DiMongodb}
                                id={1337}
                                onClick={() => handleClick(id)}
                            >
                                {v.name} | {id}
                                <Icon
                                    as={MdKeyboardArrowRight}
                                    ml="auto"
                                    transform={rotation}
                                />
                            </NavItem>
                            <Collapse in={open} animateOpacity>
                                {v.databases != null &&
                                    v.databases.map((db: Databases) => (
                                        <NavItem pl="12" py="2">
                                            {db.name}
                                        </NavItem>
                                    ))}
                            </Collapse>
                        </>
                    )
                })}
            </Flex>
        </Box>
    )
}

export default Sidebar

// {
//     dbs[0].databases != null &&
//         dbs.databases.map((e: Databases) => (
//             <NavItem
//                 icon={DiMongodb}
//                 id={1337}
//                 onClick={() => handleClick(e.name)}
//             >
//                 {e.name}
//             </NavItem>
//         ))
// }

// {dbs.map((v: ConnectionInfo) => {
//     if (v.databases) {
//         return v.databases.map((databases: Databases) => (
//             <NavItem
//                 icon={DiMongodb}
//                 id={1337}
//                 onClick={() => handleClick(databases.name)}
//             >
//                 {databases.name}
//             </NavItem>
//         ))
//     }
//     return (
//         <NavItem icon={DiMongodb} id={1337}>
//             No databases found
//         </NavItem>
//     )
// })}
