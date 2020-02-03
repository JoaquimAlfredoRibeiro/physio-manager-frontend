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

    var txt =
      '{"_name":"output","_type":"studio1.cat.act.services.athena.tech.cnf.conf.GetLangListImpl$Output","_UID":-1,"_INDEX":-1,"list":{"_name":"list","_type":"mrc.structure.resource.engine.ordb.XeCRDBCollection","name":"Langs","numTotalRecords":3,"pageSize":1000,"pageNum":0,"records":[{"_name":"recordsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBRecord","tableName":"Lang","columns":[{"_name":"columnsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBColumn","columnName":"id","dataType":"2","value":"1"},{"_name":"columnsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBColumn","columnName":"name","dataType":"8","value":"English US"},{"_name":"columnsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBColumn","columnName":"locale","dataType":"8","value":"en_US"}],"records":[]},{"_name":"recordsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBRecord","tableName":"Lang","columns":[{"_name":"columnsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBColumn","columnName":"id","dataType":"2","value":"2"},{"_name":"columnsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBColumn","columnName":"name","dataType":"8","value":"Español"},{"_name":"columnsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBColumn","columnName":"locale","dataType":"8","value":"es_ES"}],"records":[]},{"_name":"recordsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBRecord","tableName":"Lang","columns":[{"_name":"columnsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBColumn","columnName":"id","dataType":"2","value":"3"},{"_name":"columnsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBColumn","columnName":"name","dataType":"8","value":"Português"},{"_name":"columnsItem","_type":"mrc.structure.resource.engine.ordb.XeCRDBColumn","columnName":"locale","dataType":"8","value":"pt_PT"}],"records":[]}]}}'

    var obj = JSON.parse(txt)

    console.log(obj)

    //TODO implement events
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
