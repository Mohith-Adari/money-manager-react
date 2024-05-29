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
    amount: '',
    type: 'Income',
    transactionList: [],
  }

  onDelete = id => {
    const {transactionList} = this.state

    this.setState({
      transactionList: transactionList.filter(each => each.id !== id),
    })
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
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
    }))

    if (type === 'Income') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amount),
        balance: prevState.balance + parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(amount),
        expense: prevState.expense + parseInt(amount),
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
    const {
      transactionList,
      expense,
      income,
      balance,
      title,
      amount,
    } = this.state
    return (
      <div className="main-container">
        <div className="money-manager-head-container">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your
            <span style={{color: '#0b69ff'}}> Money Manager</span>
          </p>
        </div>
        <div className="money-details">
          <MoneyDetails
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            text="balance"
            money={balance}
            dataId="balanceAmount"
          />
          <MoneyDetails
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
            text="income"
            money={income}
            dataId="incomeAmount"
          />
          <MoneyDetails
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
            text="expenses"
            money={expense}
            dataId="expensesAmount"
          />
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
              value={title}
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
              value={amount}
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
            <ul className="list-style">
              {transactionList.map(each => (
                <TransactionItem
                  key={each.id}
                  details={each}
                  onDelete={this.onDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
