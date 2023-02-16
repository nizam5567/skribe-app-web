import { Badge, Box, BoxProps, Step } from '@mui/material';
import { keyframes } from '@emotion/core';
import React from 'react';

const flickeringBorder = keyframes`
    0% {
        transform: scale(1);
        opacity: 1
    }

    100% {
         transform: scale(2);
         opacity: 0
    }
    `;

export interface BouncingCircleProps {
  mainColor?: BoxProps['color']
  circleColor?: BoxProps['color']
}

export const BouncingCircle = (props: BouncingCircleProps) => {
  const { mainColor = '#33A9FF', circleColor = '#B1DAFF' } = props;

  return (
    <Box position="relative" width={60} height={60}>
      <Box position="relative" width={60} height={60}>
        <Box
          position="absolute"
          width={8}
          height={8}
          sx={{
            'top': 25.5,
            'left': 26,
            'bgcolor': mainColor,
            'borderRadius': '50%'
          }}
        ></Box>
        <Box
          position="absolute"
          top={'50%'}
          left={'50%'}
          sx={{ 'transform': 'translate(-50%, -50%)' }}
        >
          <Box
            color="primary"
            sx={{
              'width': 0,
              'height': 0,
              'borderRadius': '50%',
              '&:before': (theme) => ({
                'position': 'absolute',
                'content': "''",
                'width': 26,
                'height': 26,
                'left': -13,
                'top': -13,
                'bgcolor': 'transparent',
                'border': `1px solid ${circleColor}`,
                'borderRadius': '50%',
                'transformOrigin': 'center',
                'animation': `${flickeringBorder}  2s infinite`
              })
            }}
          ></Box>
        </Box>
        <Box
          position="absolute"
          top={'50%'}
          left={'50%'}
          sx={{ 'transform': 'translate(-50%, -50%)' }}
        >
          <Box
            color="primary"
            sx={{
              'width': 0,
              'height': 0,
              'borderRadius': '50%',
              '&:before': (theme) => ({
                'position': 'absolute',
                'content': "''",
                'width': 18,
                'height': 18,
                'left': -9,
                'top': -9,
                'bgcolor': 'transparent',
                'border': `1px solid ${circleColor}`,
                'borderRadius': '50%',
                'transformOrigin': 'center',
                'animation': `${flickeringBorder}  2s infinite`
              })
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};
