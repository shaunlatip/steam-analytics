// theme.ts
import { extendTheme } from '@chakra-ui/react';
import { Barlow } from 'next/font/google'

const nextFont = Barlow({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});


const theme = extendTheme({
    // Set the fonts like this
    fonts: {
        body: nextFont.style.fontFamily,
        heading: nextFont.style.fontFamily,
    },
});


export default theme;
