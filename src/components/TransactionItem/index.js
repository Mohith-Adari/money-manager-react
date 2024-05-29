// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, onDelete} = props
  const {id, title, amount, type} = details

  const deleteComment = () => {
    onDelete(id)
  }

  return (
    <li>
      {title} Rs {amount} {type}{' '}
      <button type="button" className="delete-icon" onClick={deleteComment}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
