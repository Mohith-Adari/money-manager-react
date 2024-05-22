// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details} = props
  const {id, title, amount, type} = details
  return (
    <li>
      {title} {amount} {type}
    </li>
  )
}

export default TransactionItem
