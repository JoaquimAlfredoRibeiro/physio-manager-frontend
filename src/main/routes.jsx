import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from '../components/main/header/Header.component'

import { Translate } from 'react-redux-i18n'

export default props => (
  <BrowserRouter>
    <div>
      <Header />
      <h1>
        <Translate value={'global.english'} />
      </h1>
    </div>
  </BrowserRouter>
)
