import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [result, setResult] = useState('');
  const [toCurrency, setToCurrency] = useState('')
  const [currrencyList, setCurrencyList] = useState([])


  useEffect(() => {
    const fetchCurrencies = async () => {
        try{
            const response = await axios.get('https://v6.exchangerate-api.com/v6/7e1f8e20b0068c022d64040e/latest/USD');
            const currencies = Object.keys(response.data.conversion_rates);
            setCurrencyList(currencies);
            setSelectedCurrency(currencies[0])
        }catch(error){
            console.error(error)
        }
    }

    fetchCurrencies();
  }, [])
  const convertCurrency = async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/7e1f8e20b0068c022d64040e/latest/${selectedCurrency}`
      );

      //console.log(response?.data?.conversion_rates)
      const conversionRate = response.data.conversion_rates[toCurrency];
      const convertedAmount = amount * conversionRate;
      setResult(`${amount} ${selectedCurrency} is approximately ${convertedAmount} ${toCurrency}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <div className="input-container">
      <input
      className='input'
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />

      <select className='select' value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
        {currrencyList.map((currency) => (
            <option value={currency} key={currency}>{currency}</option>
        ))}
      </select>
      <select className='select' value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currrencyList.map((currency) => (
            <option value={currency} key={currency}>{currency}</option>
        ))}
      </select>
      <button className='button' onClick={convertCurrency} disabled={!selectedCurrency}>
        Convert
      </button>
      </div>
      <p className='result'>{result}</p>
    </div>
  );
};

export default CurrencyConverter;
