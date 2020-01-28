import React from 'react'

import { Translate } from 'react-redux-i18n'

export default props => {
    return (
        <div>
            <h1>
                <Translate value={'apointments.welcome'} />
            </h1>
        </div>
    )
}