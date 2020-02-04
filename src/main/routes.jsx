import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navigation from '../components/navigation/nav/navigation.component'
import Dashboard from '../components/dashboard/Dashboard.component'
import Patients from '../components/patients/Patients.component'
import Apointments from '../components/apointments/Apointments.components'
import Pathologies from '../components/pathologies/Pathologies.component'
import Messages from '../components/common/Messages'
import Authorization from '../components/authorization/Authorization.component'

export default props => (
  <BrowserRouter>
    <div>
      <Navigation>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/patients" component={Patients} />
          <Route path="/apointments" component={Apointments} />
          <Route path="/pathologies" component={Pathologies} />
          <Route path="/auth" component={Authorization} />
          <Redirect from="*" to="/" />
        </Switch>
      </Navigation>
      {/* <Authorization /> */}
      <Messages />
    </div>
  </BrowserRouter>
)