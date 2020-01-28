import React from 'react'

import { Translate } from 'react-redux-i18n'

export default props => {
    return (
        <div>
            <h1>
                <Translate value={'global.english'} />
            </h1>
            <h1>
                <Translate value={'global.portuguese'} />
            </h1>
        </div>
    )
}