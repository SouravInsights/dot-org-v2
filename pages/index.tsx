import { Box, Flex } from '@raidguild/design-system';

import Meta from '../components/page-components/Meta';
import Hero from '../components/landing/1-Hero';
import Manifesto from '../components/landing/2-Manifesto';
import Services from '../components/landing/3-Services';
import Portfolio from '../components/landing/4-Portfolio';
import Join from '../components/landing/5-Join';
import Supporters from '../components/landing/6-Supporters';
import Footer from '../components/page-components/Footer';

// * `<Nav />` is included in `<Hero />` for the landing page

const Home = () => {
  return (
    <>
      <Meta />
      <Box backgroundColor='black' height='100vh' width='100%'>
        <Flex height='100%' width='100%' direction='column'>
          <Hero />
          <Manifesto />
          <Services />
          <Portfolio />
          <Join />
          <Supporters />
          <Footer />
        </Flex>
      </Box>
    </>
  );
};

export default Home;
