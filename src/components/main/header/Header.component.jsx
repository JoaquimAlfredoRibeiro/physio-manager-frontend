import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { Translate } from 'react-redux-i18n'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AccountButton from './AccountButton.component'
import LanguagePicker from './LanguagePicker.component'

import './Header.style.scss'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  changeLanguage = locale => {
    this.props.actions.setLocale(locale)
  }

  render() {
    return (
      <div className="header">
        <AppBar
          position="static"
          style={{ boxShadow: 'none' }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className="button"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography className="tabTitle">
              Tab Title Placeholder
            </Typography>

            <LanguagePicker />

            <IconButton>
              <NotificationsIcon />
            </IconButton>

            <AccountButton />

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Header
