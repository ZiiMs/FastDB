import React, { FC } from 'react'
import { Heading } from '@chakra-ui/react'

const Header: FC = () => {
    const Title = 'This is a title'

    return (
        <div>
            <Heading>{Title}</Heading>
        </div>
    )
}

export default Header
