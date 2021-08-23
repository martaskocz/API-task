import './App.css';
import React, { useState } from 'react';

const createID = () => '_' + Math.random().toString(36).substr(2, 9);

const initialList = [
  { id: createID(), name: 'Learn React', complete: false },
  { id: createID(), name: 'Learn Firebase', complete: false },
  { id: createID(), name: 'Learn GraphQL', complete: false },
];

const ListItem = ({item, handleCheckbox}) => {
  return(
    <li key={item.name}>
      <label>
        <input type="checkbox" checked={item.complete} onChange={() => handleCheckbox(item.id)}/>
        {item.name}
      </label>
    </li>
  )
};

const UserList = () => {
  const [list, setList] = useState(initialList);
  const [value, setValue] = useState('');

  const handleAddItem = (e) => {
    setValue(e.target.value)
  };

  const handleCheckbox = (id) => {
    setList(list.map((item) => {
      if (item.id === id) {
        return {...item, complete: !item.complete}
      } else {
        return item
      }
    })
    )
  };

  const handleSubmit = (e) => {
    if(e && value.length > 0) {
      setList(list.concat({id: createID(), name: value, complete: false}));
    }
    setValue('');
    e.preventDefault()
  };

  return (
    <div>
      <ul>
        {list && list.map((item) => (
          <ListItem item={item} handleCheckbox={handleCheckbox}/>
          ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleAddItem}/>
        <button type="submit">Add Item</button>
      </form>
    </div>
  )
};


function App() {
  return (
    <div className="App">
      <h1>Interview task</h1>
      <button>Colored rows</button>
      <button>Sort by country</button>
      <button>Restore the init state</button>
      <UserList/>
    </div>
  );
}

export default App;
