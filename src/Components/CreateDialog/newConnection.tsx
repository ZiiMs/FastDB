import {
    Button,
    Divider,
    Flex,
    FormControl,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react'
import React, { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { ConnectionInfo } from '../../interfaces/data'

const NewConnection: FC = () => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('localhost')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [port, setPort] = useState(27017)
    const modal = useRef<HTMLTableSectionElement | null>(null)

    useEffect(() => {
        window.api.on('create-new-connection-dialog', () => {
            setOpen(true)
        })
    }, [open])

    const handleOverlayClick = () => {
        console.log('Click')
        modal.current?.focus()
    }

    const hanldePort = (string: string) => {
        let value = parseInt(string, 10)
        if (Number.isNaN(parseInt(string, 10))) {
            value = 0
        }
        setPort(value)
    }

    const handleSubmit = (
        e: FormEvent<HTMLFormElement | HTMLButtonElement>
    ) => {
        e.preventDefault()
        const data: ConnectionInfo = { name, address, port, username, password }
        window.api.send('addNewConnection', data)
        setOpen(false)
    }

    return (
        <Flex>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                closeOnOverlayClick={false}
                onOverlayClick={handleOverlayClick}
            >
                <ModalOverlay />
                <ModalContent ref={modal}>
                    <ModalHeader>Add new connection.</ModalHeader>
                    <form onSubmit={handleSubmit}>
                        <ModalBody pb={8}>
                            <FormControl>
                                <Input
                                    mb={3}
                                    placeholder="Name"
                                    value={name}
                                    onChange={(value) =>
                                        setName(value.target.value)
                                    }
                                />
                            </FormControl>

                            <HStack mb={3}>
                                <FormControl>
                                    <Input
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </FormControl>

                                <FormControl>
                                    <NumberInput
                                        placeholder="Port"
                                        precision={0}
                                        value={port}
                                        step={1}
                                        keepWithinRange={false}
                                        clampValueOnBlur={false}
                                        onChange={hanldePort}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            </HStack>
                            <Divider orientation="horizontal" mb={3} />
                            <FormControl>
                                <Input
                                    mb={3}
                                    placeholder="Username"
                                    value={username}
                                    onChange={(value) =>
                                        setUsername(value.target.value)
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    mb={3}
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(value) =>
                                        setPassword(value.target.value)
                                    }
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onSubmit={handleSubmit}
                                mr={4}
                                type="submit"
                            >
                                Add
                            </Button>
                            <Button onClick={() => setOpen(false)}>
                                Close
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <p>Working?</p>
        </Flex>
    )
}

export default NewConnection
