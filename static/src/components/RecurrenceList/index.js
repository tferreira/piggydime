import React from 'react';
import {grey300, red500} from 'material-ui/styles/colors';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import styles from './styles.scss';

export default class RecurrenceList extends React.Component {
  state = {
    fixedHeader: false,
    fixedFooter: false,
    stripedRows: true,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: false,
    showCheckboxes: false,
    height: '400px',

    editing: null,
  }

  stopClick(e) {
    e.stopPropagation()
  }

  handleCellClick(row, column, event) {
    // Apply the same sort and filter that we do on render()
    // to be able to retrieve the datas based on array indexes
    let rawData = this.props.data
    const filteredGroups = rawData.filter((group) => group.account_id === this.props.selectedAccount)
    let activeGroups = []
    let archivedGroups = []
    filteredGroups.forEach((group) => {
      if (new Date(group.end_date) <= new Date) {
        archivedGroups.push(group)
      } else {
        activeGroups.push(group)
      }
    })
    activeGroups.sort((a,b) => {
      return a.label > b.label;
    });
    archivedGroups.sort((a,b) => {
      return a.label > b.label;
    });
    let sortedGroups = activeGroups.concat(archivedGroups)

    if (column === 7) {  // delete
      this.setState({
        editing: null
      })
      let choice = confirm("Do you really want to delete the recurring group: ".concat(sortedGroups[row].label, "?"));
      if (choice == true) {
          this.handleDeleteItem(sortedGroups[row].id)
      }
    } else {
      this.setState({
        editing: sortedGroups[row].id,
      })
    }
  }

  handleEditField(event) {
    if ( event.keyCode === 13 ) {
      let target = event.target,
        update = {}

      update.id = this.state.editing

      let value = target.value
      update[target.name] = value

      this.handleRecurrenceUpdate(update)
    }
  }

  handleChangeField(event) {
    this.setState({selected: event.target.value})
  }

  handleEditItem() {
    let itemId = this.state.editing

    this.handleRecurrenceUpdate({
      id: itemId,
      label: this.refs[ `label_${ itemId }` ].value,
      start_date: this.refs[ `start_date_${ itemId }` ].value,
      end_date: this.refs[ `end_date_${ itemId }` ].value,
      amount: this.refs[ `amount_${ itemId }` ].value,
      recurrence_day: Number(this.refs[ `recurrence_day_${ itemId }` ].value),
    })
  }

  handleDeleteItem(id) {
    this.props.deleteRecurrence(id, (result) => {
      if (result) {
        this.setState({
          editing: null
        })
      }
    })
  }

  handleRecurrenceUpdate(data) {
    this.props.editRecurrence(data, (result) => {
      if (result) {
        this.setState({
          editing: null
        })
      }
    })
  }

  renderTable(list) {
    // filter groups not belonging to current selected account
    const filteredGroups = list.filter((group) => group.account_id === this.props.selectedAccount)
    let activeGroups = []
    let archivedGroups = []
    filteredGroups.forEach((group) => {
      if (new Date(group.end_date) <= new Date) {
        archivedGroups.push(group)
      } else {
        activeGroups.push(group)
      }
    })
    activeGroups.sort((a,b) => {
      return a.label > b.label;
    });
    archivedGroups.sort((a,b) => {
      return a.label > b.label;
    });
    let sortedGroups = activeGroups.concat(archivedGroups)
    const rows = sortedGroups.map((row) => {
      if ( this.state.editing === row.id ) {
        return <TableRow key={ row.id } className={styles.tableRow}>
          <TableRowColumn>
            <input
              onKeyDown={ this.handleEditField.bind(this) }
              type="text"
              className="form-control"
              ref={ `label_${ row.id }` }
              name="label"
              defaultValue={ row.label }
            />
          </TableRowColumn>
          <TableRowColumn>
            <input
              onKeyDown={ this.handleEditField.bind(this) }
              type="text"
              className="form-control"
              ref={ `start_date_${ row.id }` }
              name="start_date"
              defaultValue={ row.start_date }
            />
          </TableRowColumn>
          <TableRowColumn>
            <input
              onKeyDown={ this.handleEditField.bind(this) }
              type="text"
              className="form-control"
              ref={ `end_date_${ row.id }` }
              name="end_date"
              defaultValue={ row.end_date }
            />
          </TableRowColumn>
          <TableRowColumn>
            <input
              onKeyDown={ this.handleEditField.bind(this) }
              type="text"
              className="form-control"
              ref={ `amount_${ row.id }` }
              name="amount"
              defaultValue={ row.amount }
            />
          </TableRowColumn>
          <TableRowColumn>
            <input
              onKeyDown={ this.handleEditField.bind(this) }
              type="text"
              className="form-control"
              ref={ `recurrence_day_${ row.id }` }
              name="recurrence_day"
              defaultValue={ row.recurrence_day }
            />
          </TableRowColumn>
          <TableRowColumn>
            <input
              onKeyDown={ this.handleEditField.bind(this) }
              type="text"
              className="form-control"
              ref={ `recurrence_month_${ row.id }` }
              name="recurrence_month"
              defaultValue={ row.recurrence_month }
            />
          </TableRowColumn>
          <TableRowColumn>
            <button type='submit' onClick={ this.handleEditItem.bind(this) }>Edit</button>
          </TableRowColumn>
        </TableRow>
      } else {
        const archived = new Date(row.end_date) < new Date
        return <TableRow key={ row.id }>
          <TableRowColumn className={archived ? styles.tableRowArchived : ''}>{!archived ? row.label : row.label.concat(' (FINISHED)')}</TableRowColumn>
          <TableRowColumn className={archived ? styles.tableRowArchived : ''}>{row.start_date}</TableRowColumn>
          <TableRowColumn className={archived ? styles.tableRowArchived : ''}>{row.end_date}</TableRowColumn>
          <TableRowColumn className={archived ? styles.tableRowArchived : ''}>{row.amount}</TableRowColumn>
          <TableRowColumn className={archived ? styles.tableRowArchived : ''}>{row.recurrence_day}</TableRowColumn>
          <TableRowColumn className={archived ? styles.tableRowArchived : ''}>{row.recurrence_month}</TableRowColumn>
          <TableRowColumn className={archived ? styles.tableRowArchived : ''}>
            <DeleteForeverIcon color={archived ? grey300 : ''} hoverColor={red500}/>
          </TableRowColumn>
        </TableRow>
      }
    })
    return rows
  }

  render() {
    if (this.props.selectedAccount === undefined || this.props.selectedAccount === null) {
      return null
    }

    return (
      <div className={styles.mainContainer}>
      {!this.props.loaded
        ? <h1>Loading data...</h1>
        :
        <div className={styles.mainTable}>
          <Table
            ref='table'
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
            onCellClick={this.handleCellClick.bind(this)}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn>Label</TableHeaderColumn>
                <TableHeaderColumn>From</TableHeaderColumn>
                <TableHeaderColumn>Until</TableHeaderColumn>
                <TableHeaderColumn>Amount</TableHeaderColumn>
                <TableHeaderColumn>Day of month</TableHeaderColumn>
                <TableHeaderColumn>Month of year</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
              style={{height: '100%'}}
            >
              {this.renderTable(this.props.data)}
            </TableBody>
          </Table>
        </div>
      }
      </div>
    );
  }
}
