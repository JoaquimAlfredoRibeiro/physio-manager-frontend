import React from 'react'
import { Translate } from 'react-redux-i18n'
import appConstants from '../../appConstants'

import { Typography } from '@material-ui/core';


export default function TextFieldDisplay(props) {

    return (
        <div style={{ marginTop: `${props.marginTop}` }}>
            <Typography variant='h6' align='left '><Translate value={props.label} /></Typography>
            <Typography variant='subtitle1' align='left'>{props.value}</Typography>
        </div>
    )
}