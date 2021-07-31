import { Icon, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
// import { IconType } from 'react-icons';

// interface NavProps {
//     icon: any
//     children?: any
// }

const NavItem: FC<any> = (props: any) => {
    const { icon, children, ...rest } = props
    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            role="group"
            color={useColorModeValue('inherit', 'gray.400')}
            _hover={{
                bg: useColorModeValue('gray.100', 'gray.700'),
                color: useColorModeValue('gray.900', 'gray.200'),
            }}
            transition=".15s ease"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {icon && (
                <Icon
                    mr="2"
                    boxSize="4"
                    as={icon}
                    _groupHover={{
                        color: useColorModeValue('gray.600', 'gray.100'),
                    }}
                />
            )}
            {children}
        </Flex>
    )
}

// NavItem.defaultProps = {
//     children: '',
// }

export default NavItem
