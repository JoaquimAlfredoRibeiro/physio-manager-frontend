import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import { Translate } from 'react-redux-i18n'
import { withStyles } from '@material-ui/core/styles';

import PathologiesStyles from './Pathologies.styles'
import MaterialTable, { MTableHeader, MTableToolbar } from 'material-table';
import AuthRequired from '../common/AuthRequired'

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import _ from 'lodash'

import { createPathology, updatePathology, deletePathology, getAllPathologies, clearData, clearErrors, setShowPathologyDialog } from './PathologiesActions'
import { Button, Paper, Typography } from '@material-ui/core';
import TableTitle from '../common/TableTitle';
import ConfirmationDialog from '../common/ConfirmationDialog.component';

const styles = PathologiesStyles;
const I18n = require('react-redux-i18n').I18n;
const NEW_PATHOLOGY = "addPathology";
const EDIT_PATHOLOGY = "editPathology";

class Pathologies extends React.Component {

    constructor(props) {
        super(props)
        this.props.getAllPathologies()
        this.props.setShowPathologyDialog(false)

        this.state = {
            dialogType: '',
            showDeleteDialog: false,
            selectedPathologyId: '',
            name: '',
            description: '',
            errors: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.errors) {
            return {
                errors: props.errors
            }
        }

        return null;
    }

    componentWillUnmount() {
        this.props.clearData();
        this.props.clearErrors();
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    newPathology = () => {

        this.setState({
            dialogType: NEW_PATHOLOGY,
            selectedPathologyId: '',
            name: '',
            description: '',
            errors: {}
        });
        this.props.setShowPathologyDialog(true)
    }

    dialogClose = () => {

        this.props.setShowPathologyDialog(false)

        this.setState({
            selectedPathologyId: '',
            name: '',
            description: '',
            errors: {}
        });

        this.props.clearErrors()
    }

    dialogSubmit = (e) => {
        e.preventDefault();

        const pathology = {
            id: this.state.selectedPathologyId,
            name: this.state.name,
            description: this.state.description,
        }

        if (this.state.dialogType === NEW_PATHOLOGY) {
            this.props.createPathology(pathology)
        } else if (this.state.dialogType === EDIT_PATHOLOGY) {
            this.props.updatePathology(pathology)
        }
    }

    editPathology = (row) => {

        this.setState({
            dialogType: EDIT_PATHOLOGY,
            selectedPathologyId: row.id,
            name: row.name,
            description: row.description,
            errors: {}
        });

        this.props.setShowPathologyDialog(true)
    }

    deletePathologyOpen = (id) => {

        this.setState({
            showDeleteDialog: true,
            selectedPathologyId: id
        });
    }

    deletePathologyClose = () => {
        this.setState({
            showDeleteDialog: false,
            selectedPathologyId: ''
        });
    }

    deletePathologyAccept = () => {

        this.props.deletePathology(this.state.selectedPathologyId)

        this.setState({
            showDeleteDialog: false,
            selectedPathologyId: ''
        });
    }

    render() {

        const { classes } = this.props;
        let { pathologiesList, showPathologyDialog } = this.props;
        const { errors } = this.state;

        if (!pathologiesList.pathologies || !pathologiesList.pathologies.length) {
            pathologiesList.pathologies = []
        }

        if (showPathologyDialog === undefined) {
            showPathologyDialog = false
        }

        return (
            <div className={classes.root}>
                <TableTitle text='pathologies.pathologiesList' />
                <MaterialTable
                    // title={<Typography variant='h5'><Translate value='pathologies.pathologiesList' /></Typography>}
                    title=''
                    columns={
                        [
                            { title: `${I18n.t('pathologies.name')}`, field: 'name' },
                            { title: `${I18n.t('pathologies.description')}`, field: 'description' },
                        ]}
                    data={
                        pathologiesList.pathologies.map(row => (
                            { id: `${row.id}`, name: `${row.name}`, description: `${row.description}` }
                        ))
                    }
                    actions={
                        [
                            {
                                icon: 'edit',
                                tooltip: `${I18n.t('pathologies.editPathology')}`,
                                onClick: (event, row) => this.editPathology(row)
                            },
                            {
                                icon: 'delete',
                                tooltip: `${I18n.t('pathologies.deletePathology')}`,
                                onClick: (event, row) => this.deletePathologyOpen(row.id)
                            }
                        ]}
                    localization={{
                        pagination: {
                            labelDisplayedRows: `${I18n.t('table.displayedRows')}`,
                            labelRowsSelect: `${I18n.t('table.rows')}`,
                            firstTooltip: `${I18n.t('table.firstPage')}`,
                            previousTooltip: `${I18n.t('table.previousPage')}`,
                            lastTooltip: `${I18n.t('table.lastPage')}`,
                            nextTooltip: `${I18n.t('table.nextPage')}`,
                        },
                        header: {
                            actions: `${I18n.t('table.actions')}`
                        },
                        toolbar: {
                            searchPlaceholder: `${I18n.t('table.search')}`
                        },
                        body: {
                            emptyDataSourceMessage: `${I18n.t('table.emptyDataSourceMessage')}`
                        }
                    }
                    }
                >
                </MaterialTable >
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<PersonAddIcon />}
                    onClick={() => this.newPathology()}
                >
                    <Translate value='pathologies.addPathology' />
                </Button>

                <Dialog open={showPathologyDialog} onClose={this.dialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{I18n.t(`pathologies.${this.state.dialogType}`)}</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label={<Translate value='pathologies.name' />}
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={this.handleInputChange}
                            value={this.state.name}
                            error={Boolean(`${_.get(errors, ['fields', 'name'], '')}`)}
                            helperText={I18n.t(`pathologyProfileValidation.${_.get(errors, ['fields', 'name'], '')}`)}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label={<Translate value='pathologies.description' />}
                            type="description"
                            id="description"
                            autoComplete="description"
                            onChange={this.handleInputChange}
                            value={this.state.description}
                            error={Boolean(`${_.get(errors, ['fields', 'description'], '')}`)}
                            helperText={I18n.t(`pathologyProfileValidation.${_.get(errors, ['fields', 'description'], '')}`)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.dialogClose} color="primary">
                            {I18n.t('global.cancel')}
                        </Button>
                        <Button onClick={this.dialogSubmit} color="primary">
                            {I18n.t('global.submit')}
                        </Button>
                    </DialogActions>
                </Dialog>

                <ConfirmationDialog
                    open={this.state.showDeleteDialog}
                    handleClose={this.deletePathologyClose}
                    handleAccept={this.deletePathologyAccept}
                    title='pathologies.deletePathology'
                    text='pathologies.deletePathologyConfirmation'
                />
            </div >
        )
    }
}

Pathologies.propTypes = {
    createPathology: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    pathologiesList: state.pathologies.pathologiesList,
    showPathologyDialog: state.pathologies.showPathologyDialog,
    errors: state.errors
})

const mapDispatchToProps = dispatch => bindActionCreators({ createPathology, updatePathology, deletePathology, getAllPathologies, clearData, clearErrors, setShowPathologyDialog }, dispatch)

export default AuthRequired(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Pathologies))))