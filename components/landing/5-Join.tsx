import { Flex, VStack, SimpleGrid, Image, Heading, Button, Text } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';

import { culture } from '../../utils/constants';

const SectionFive = () => (
  <Flex
    layerStyle='redToPurpleHorizontalGradient'
    minHeight='100vh'
    direction='column'
    alignItems='center'
    justifyContent='center'
    px={{ base: '2rem', lg: '8rem' }}
    py='6rem'>
    <VStack spacing={5} justifyContent='center'>
      <Heading mb='1rem'>Join the Guild</Heading>
      <Text maxW='60%'>
        We believe workers should be self-sovereign and able to work when, where and how they want, as long as they
        create high value output. We&apos;re looking for top talent that can take things into their own hands and bring
        unique value to the guild.
      </Text>
      <br />
      <Link href='/join'>
        <Button>Join Us</Button>
      </Link>
    </VStack>

    <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={5} mt='6rem'>
      {culture.map((item) => (
        <Flex
          maxWidth='350px'
          key={item.name}
          direction='column'
          alignItems='center'
          justifyContent='space-evenly'
          py='2rem'
          px='1.5rem'
          bg='black'
          borderTop='2px solid'
          borderColor='primary.500'>
          <Heading size='md' mb={3}>
            {item.name}
          </Heading>
          <Image src={item.img} alt='culture' my='.5rem' />

          <Text>{item.text}</Text>
        </Flex>
      ))}
    </SimpleGrid>
  </Flex>
);

export default SectionFive;
