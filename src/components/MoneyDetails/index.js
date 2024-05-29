// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {imgUrl, text, money} = props
  return (
    <div className="money-container">
      <img src={imgUrl} alt={text} className="money-icon" />
      <div>
        <p>Your {text}</p>
        <p data-testid="">Rs {money}</p>
      </div>
    </div>
  )
}

export default MoneyDetails
