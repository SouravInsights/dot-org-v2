import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Flex,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';

import { AppContext } from '../context/AppContext';

import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { FAQ } from '../shared/Faq';

import { Intro } from '../views/joinus/Intro';
import { StepOne } from '../views/joinus/StepOne';
import { StepTwo } from '../views/joinus/StepTwo';
import { StepThree } from '../views/joinus/StepThree';
import { StepFour } from '../views/joinus/StepFour';
import { StepFive } from '../views/joinus/StepFive';
import { StepSix } from '../views/joinus/StepSix';
import { Confirmation } from '../views/joinus/Confirmation';

import { StyledSecondaryHeading } from '../themes/styled';

const stageHeadings = {
  1: 'A Quick Intro',
  2: 'Your Social Presence',
  3: 'Your SkillSet',
  4: 'Tell Us More',
  5: 'Your Crypto Journey',
  6: 'Guild Readiness'
};

const Join = () => {
  const context = useContext(AppContext);

  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <Flex
      width='100vw'
      minHeight='100vh'
      direction='column'
      justifyContent='space-between'
      alignItems='center'
    >
      <Box px={{ base: '2rem', lg: '5rem' }} w='100%'>
        <Header windowWidth={windowWidth} />
      </Box>

      {context.stage > 1 && context.stage < 8 && (
        <Flex
          direction='row'
          alignItems='center'
          mt='2rem'
          mr='auto'
          px={{ base: '2rem', lg: '5rem' }}
        >
          <CircularProgress
            value={context.stage - 1}
            thickness='4px'
            max={6}
            color='red'
          >
            <CircularProgressLabel
              color='red'
              fontFamily='jetbrains'
              fontSize={{ base: '20px', lg: '26px' }}
            >
              {context.stage - 1}
            </CircularProgressLabel>
          </CircularProgress>{' '}
          <StyledSecondaryHeading
            fontSize={{ base: '20px', lg: '26px' }}
            ml='1rem'
          >
            {stageHeadings[context.stage - 1]}
          </StyledSecondaryHeading>
        </Flex>
      )}

      {context.stage === 1 && <Intro />}
      {context.stage === 2 && <StepOne />}
      {context.stage === 3 && <StepTwo />}
      {context.stage === 4 && <StepThree />}
      {context.stage === 5 && <StepFour />}
      {context.stage === 6 && <StepFive windowWidth={windowWidth} />}
      {context.stage === 7 && <StepSix />}
      {context.stage === 8 && <Confirmation />}

      <FAQ />
      <Footer />
    </Flex>
  );
};

export default Join;
