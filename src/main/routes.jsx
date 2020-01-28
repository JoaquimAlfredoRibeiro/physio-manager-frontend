import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Patients from '../components/patients/Patients.component'
import Navigation from '../components/main/nav/navigation.component'

export default props => (
  <BrowserRouter>
    <div>
      <Navigation>
        <Switch>
          <Route path="/patients" component={Patients} />
          <Redirect from="*" to="/" />
        </Switch>
      </Navigation>
    </div>
  </BrowserRouter>
)