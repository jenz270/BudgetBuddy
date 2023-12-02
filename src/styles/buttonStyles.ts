import { darken, mode, whiten} from "@chakra-ui/theme-tools"

export const buttonStyles = {
    baseStyle: {},
    sizes: {},
    variants: {
        primary: () => ({
            bg: "secondary",
            color: "white",
            _hover: {
                bg: mode(darken("secondary", 20), whiten("secondary", 20)),
                boxShadow: "md",
            }
        })
    }
}