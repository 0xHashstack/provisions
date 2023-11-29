import Navbar from '@/components/Navbar'
import ContributorsChart from '@/components/charts/ContributorsChart'
import { Box,HStack,Spinner,Stack,Text, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import DetailsForm from '@/components/Form/DetailsForm'
import { useAccount, useBalance } from 'wagmi'
import { useRouter } from 'next/router'
import { mainnet, sepolia, goerli, polygon, optimism, polygonMumbai } from '@wagmi/core/chains'

export default function Form()  {
  const [isLargerThan2000] = useMediaQuery('(min-width: 2000px)')
  const [isLargerThan1280] = useMediaQuery("(min-width: 1248px)");

// const 
const [render, setRender] = useState(false)
useEffect(()=>{
  setTimeout(() => {
    setRender(true);
  }, 2000);
},[])
  return (
      <Box>
        <Box background={`
            radial-gradient(circle 1800px at top left, rgba(115, 49, 234, 0.10), transparent) top left,
            radial-gradient(circle 1200px at bottom right, rgba(115, 49, 234, 0.10), transparent) bottom right,
            black
          `} position={'fixed'} zIndex={3} >
          <Navbar />
        </Box>
        {!render && <Box
        background={`
                radial-gradient(circle 1800px at top left, rgba(115, 49, 234, 0.15), transparent) top left,
                radial-gradient(circle 1300px at bottom right, rgba(115, 49, 234, 0.15), transparent) bottom right,
                black
              `}
        color="white"
        zIndex={1}
        padding="0"
        // mb="4rem"
       
        pr="2rem"
        pl={isLargerThan2000 ?"6rem":"2rem"} 
        display="flex"
        flexDirection="column"
        minHeight={"100vh"}
        pt="8rem"
      >         <Stack
      alignItems="center"
      justifyContent="center"
      minHeight={"100vh"}
      pt="8rem"
      // backgroundColor="#010409"
      pb={isLargerThan1280 ? "7rem" : "0rem"}

      
    >

      {/* <Text color="#FFFFFF" fontSize="20px">
      Loading...
    </Text> */}
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#010409"
        size="xl"
      />  </Stack> </Box>}
       {render && <Box
        background={`
                radial-gradient(circle 1800px at top left, rgba(115, 49, 234, 0.15), transparent) top left,
                radial-gradient(circle 1300px at bottom right, rgba(115, 49, 234, 0.15), transparent) bottom right,
                black
              `}
        color="white"
        zIndex={1}
        padding="0"
        // mb="4rem"
       
        pr="2rem"
        pl={isLargerThan2000 ?"6rem":"2rem"} 
        display="flex"
        flexDirection="column"
        minHeight={"100vh"}
        pt="8rem"
        pb={isLargerThan1280 ? "7rem" : "0rem"}
      >
 
        <Text  borderBottom={'thick'}
         color="white" mb="4rem" width={'15%'} display='flex' flexDirection={'row'} justifyContent='begin' >
                   <Box borderBottomWidth={'thick'} borderBottomColor={'#4D59E8'} p='2'   >
          Presale Interest form </Box>
        </Text>
       
        {/* <ContributorsChart/> */}
        <HStack
      w="100%"
      h="30%"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
    >
        <DetailsForm/>
        {/* <DetailsForm/> */}
      </HStack>
   
        {/* <Text color="white" mt="3rem" mb="2rem">
          Tokenomics
        </Text>
        <ContributorsChart/> */}

        
        </Box>}
    
    </Box>
  )
}

