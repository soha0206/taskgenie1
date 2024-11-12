// src/App.js
import React, { useEffect, useState } from 'react';
import { fetchData } from './services/api';
import Button from './components/Button';
import './styles/app.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData('https://api.example.com/data')
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>TaskGenie</h1>
      <Button label="Fetch Data" onClick={() => console.log('Data fetched')} />
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
