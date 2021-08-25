import './App.css';
import React, { useState } from 'react';

function App() {

  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setTimeout(() => setCount(count => count + 1), 1000);
  };

  const handleDecrease = () => {
    setTimeout(() => setCount(count => count - 1), 1000);
  };

  return (
      <div className="App">
        Total: {count}
        <button onClick={handleIncrease}>Increase State</button>
        <button onClick={handleDecrease}>Decrease State</button>
      </div>
  );
}

export default App;
