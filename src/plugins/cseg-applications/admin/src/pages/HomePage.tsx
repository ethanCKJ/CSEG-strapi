import React from 'react';
import { Box, Typography } from '@strapi/design-system';

/**
 * Basic homepage showing hello world message
 * @constructor
 */
const HomePage = () => {
  return (
      <Box padding={8}>
        <Typography variant={"alpha"}>Hello world</Typography>
      </Box>
  )
}
export default HomePage;