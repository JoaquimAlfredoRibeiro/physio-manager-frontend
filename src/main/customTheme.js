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
    }
  }
});
