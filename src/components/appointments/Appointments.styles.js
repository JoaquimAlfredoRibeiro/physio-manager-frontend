export default theme => ({
    root: {
        // flexGrow: 1,
        // position: 'relative',
        // display: 'flex',
        // flexDirection: 'column',
        // marginTop: theme.spacing(0),
    },
    button: {
        margin: theme.spacing(3, 0),
        alignContent: 'flex-start',
        flexGrow: 1,
        width: 'fit-content'
    },
    addButton: {
        position: 'absolute',
        bottom: theme.spacing(7),
        right: theme.spacing(5),
    },
});