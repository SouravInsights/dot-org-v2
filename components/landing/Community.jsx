import { Flex, Image, Heading } from '@chakra-ui/react';
import { theme } from '../../themes/theme';

export const Community = () => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      padding={{ base: '2rem', lg: '2rem 4rem' }}
      bg='#201F1D'
    >
      <Heading
        variant='headingTwo'
        mb='2rem'
        mt='2rem'
        fontSize={{ base: '1.5rem', lg: '36px' }}
      >
        Supported by
      </Heading>
      <Flex
        w='100%'
        justifyContent='space-evenly'
        alignItems='center'
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <Image
          src={theme.images.metachilli}
          alt='metacartel'
          w={{ base: '120px', lg: '200px' }}
        />
        <Image
          src={theme.images.daohaus}
          alt='daohaus'
          w={{ base: '120px', lg: '200px' }}
        />
        <Image
          src={theme.images.moloch}
          alt='molochdao'
          w={{ base: '120px', lg: '200px' }}
        />
      </Flex>
    </Flex>
  );
};
