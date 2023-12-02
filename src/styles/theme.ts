import { extendTheme } from "@chakra-ui/react";
import { buttonStyles as Button } from './buttonStyles';
import { drawerStyles as Drawer } from './drawerStyles';

export const NewTheme = extendTheme({
    styles: {
        global: {
          body: {
            bg: 'background',
          },
        },
      },
    colors: {
        primary: "#CE5A67",
        secondary: "#F9B572",
        darkHighlight: "#F1D1AB",
        highlight: "#FCF5ED",
        background: "#FFFAFA",
        backgroundDark: "#EB8F76",
        dark: "#1F1717"
    },
    components: {
        Button,
        Drawer,
    },
})