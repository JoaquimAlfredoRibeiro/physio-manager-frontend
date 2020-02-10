import React from 'react'
import { Translate } from 'react-redux-i18n'
import appConstants from '../../appConstants'

export default function TableTitle(props) {

    return (
        <div style={{
            fontSize: '2em',
            marginLeft: '30px',
            backgroundColor: appConstants.PRIMARY_INFO_MAIN,
            color: '#FFF',
            borderRadius: '5px',
            padding: '7px 15px',
            marginTop: '-12px',
            position: 'absolute',
            zIndex: 1
        }}>
            <Translate value={props.text} />
        </div >
    )

    // return (
    //     <div style={{
    //         fontSize: '2em',
    //         marginLeft: '30px',
    //         backgroundColor: appConstants.PRIMARY_INFO_MAIN,
    //         color: '#FFF',
    //         borderRadius: '5px',
    //         padding: '15px',
    //         marginTop: '-50px',
    //         overflow: 'visible'
    //     }}>
    //         <Translate value={props.text} />
    //     </div >
    // )


}