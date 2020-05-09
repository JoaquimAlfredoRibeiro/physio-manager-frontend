export default theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        marginTop: '10px'
    },
    tablePaper: {
        textAlign: 'left',
        color: theme.palette.text.secondary,
        marginTop: '10px'
    },
    topspacing: {
        marginTop: '20px'
    },
    listspacing: {
        marginTop: '20px'
    },
    addButton: {
        position: 'absolute',
        right: theme.spacing(6),
    },
    form: {
        marginLeft: '12px',
        marginRight: '0px'
    },
});