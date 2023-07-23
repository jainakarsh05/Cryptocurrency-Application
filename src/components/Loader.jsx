import { Box, Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent={"center"}>
        <Box transform={"scale(4)"}>
            <Spinner size={"xl"}/>
        </Box>
        <Text fontSize={"5vh"} mt={"20"} fontWeight={"500"} fontFamily={'sans-serif'}>Loading...</Text>
    </VStack>
  )
}

export default Loader