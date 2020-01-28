import { createMuiTheme } from "@material-ui/core/styles";
import appConstants from "../appConstants";

//Create custom theme
export default createMuiTheme({
  palette: {
    background: {
      default: appConstants.BACKGROUND_COLOR
    }
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: "#555555",
        backgroundColor: appConstants.BACKGROUND_COLOR
      }
    },
    MuiMenuItem: {
      root: {
        '&:hover': {
          backgroundColor: appConstants.PRIMARY_INFO_LIGHT,
          color: 'white'
        }
      }
    },
    MuiBadge: {
      colorPrimary: {
        backgroundColor: appConstants.PRIMARY_INFO_MAIN
      }
    },
    MuiToolbar: {
      gutters: {
        '@media (min-width: 600px)': {
          paddingRight: '0px'
        }
      }
    }
  }
});