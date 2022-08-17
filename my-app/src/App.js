import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  // const [isTrue, setIstrue] = useState(true);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const onChange = (event) => {
    setValue(event.target.value);
  }
  const onInputChange = (event) => {
    setInputValue(event.target.value);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [])
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong>:
      <div>
        <select onChange={onChange}>
          {coins.map((coin)=><option value={coin.quotes.USD.price}>{coin.name} ({coin.symbol}) : {coin.quotes.USD.price}</option>)}
        </select>
        <br/>
        <input onChange={onInputChange} placeholder="money"/>
        <br/>
        <h3>살 수 있는 코인의 개수 : {inputValue/value}</h3>
      </div>
      }
    </div>
  );
}



export default App;
