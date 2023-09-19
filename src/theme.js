import { createTheme, colors } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#47D400'
        },
        secondary: {
            main: colors.grey[500]
        }
    }
});

export default theme;