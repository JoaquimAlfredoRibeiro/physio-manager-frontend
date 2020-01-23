import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { Translate } from 'react-redux-i18n'

class AccountButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.setState({ anchorEl: null });
    //TODO implement events
    console.log(event)
  };

  render() {
    const { anchorEl } = this.state;
    const items = [{ id: '1', name: 'topNav.myAccount' }, { id: '2', name: 'topNav.logout' }];

    return (
      <div>
        <IconButton aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}>
          <AccountBoxIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}

        >
          {items.map(item => (
            <MenuItem
              key={item.id}
              onClick={(event) => this.handleClose(item, event)}>
              <Translate value={item.name} />
            </MenuItem>
          ))}
        </Menu>
      </div >
    )
  }
}

export default AccountButton
