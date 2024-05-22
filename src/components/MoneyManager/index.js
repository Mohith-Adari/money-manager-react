import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balance: 0,
    expense: 0,
    income: 0,
    title: '',
    amount: 0,
    type: 'Income',
    transactionList: [],
  }

  onSubmit = event => {
    const {title, amount, type} = this.state
    event.preventDefault()
    const newTransaction = {
      id: v4(),
      title,
      amount,
      type,
    }

    this.setState(prevState => ({
      transactionList: [...prevState, newTransaction],
      title: '',
      amount: '',
    }))

    if (type === 'Income') {
      this.setState(prevState => ({
        income: prevState.income + amount,
        balance: prevState.balance + amount,
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance - amount,
        expense: prevState.expense + amount,
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({type: event.target.value})
  }

  render() {
    const {transactionList} = this.state
    return (
      <div className="main-container">
        <div className="money-manager-head-container">
          <h1>Hi, Richard</h1>
          <span>
            Welcome back to your
            <span style={{color: '#0b69ff'}}> Money Manager</span>
          </span>
        </div>
        <div className="money-details">
          <h1>hi</h1>
        </div>
        <div className="transaction-history">
          <form className="add-transaction">
            <h1 className="transaction-heading">Add Transaction</h1>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              className="input"
              placeholder="TITLE"
              onChange={this.onChangeTitle}
            />
            <label htmlFor="amount" className="label">
              AMOUNT
            </label>
            <input
              type="number"
              id="amount"
              className="input"
              placeholder="AMOUNT"
              onChange={this.onChangeAmount}
            />
            <label htmlFor="type" className="label">
              TYPE
            </label>
            <select id="type" className="input" onChange={this.onChangeSelect}>
              {transactionTypeOptions.map(each => (
                <option value={each.optionId} style={{padding: '8px'}}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="submit-btn"
              onClick={this.onSubmit}
            >
              Add
            </button>
          </form>
          <div className="history">
            <h1 className="transaction-heading">History</h1>
            <p className="table">Title Amount Type</p>
            <ul>
              {transactionList.map(each => (
                <TransactionItem key={each.id} details={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager