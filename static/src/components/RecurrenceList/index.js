import React from 'react';
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
    if (this.state.editing === null && column === 6) {  // delete
      this.handleDeleteItem(this.props.data[row].id)
    } else {
      this.setState({
        editing: this.props.data[row].id,
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
    const rows = list.filter((group) => group.account_id === this.props.selectedAccount).map((row) => {
      if ( this.state.editing === row.id ) {
        return <TableRow key={ row.id }>
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
            <button type='submit' onClick={ this.handleEditItem.bind(this) }>Edit</button>
          </TableRowColumn>
        </TableRow>
      } else {
        return <TableRow key={ row.id }>
          <TableRowColumn>{row.label}</TableRowColumn>
          <TableRowColumn>{row.start_date}</TableRowColumn>
          <TableRowColumn>{row.end_date}</TableRowColumn>
          <TableRowColumn>{row.amount}</TableRowColumn>
          <TableRowColumn>{row.recurrence_day}</TableRowColumn>
          <TableRowColumn>(delete button here)</TableRowColumn>
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