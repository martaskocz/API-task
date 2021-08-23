import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cn from 'classnames';
import './App.css';

function UserList({users, deleteUser, coloredRows}) {

   const colored = cn({
       coloredRows: coloredRows
   });

  return (
      <table width={'100%'}>
        <thead>
            <tr>
                <th>image</th>
                <th>name</th>
                <th>surname</th>
                <th>country</th>
                <th>delete</th>
            </tr>
        </thead>
        <tbody className={colored}>
        {users.map((user) => (
            <tr className="userRow">
                <th><img src={user.picture.thumbnail}/></th>
                <th>{user.name.first}</th>
                <th>{user.name.last}</th>
                <th>{user.location.country}</th>
                <th><button onClick={() => deleteUser(user.login.uuid)}>delete</button></th>
            </tr>
        ))}
        </tbody>
      </table>
  );
}


function App() {

    const [usersList, setUsers] = useState([]);
    const [initialState, setInitialState] = useState([]);
    const [error, handleAPIError] = useState('');
    const [sortFlag, setSortFlag] = useState(false);
    const [coloredRows, setColoredRows] = useState(false);

    useEffect( () => {
        axios.get('https://randomuser.me/api?results=100')
            .then((response) => {
                setUsers(response.data.results);
                setInitialState(response.data.results)
            })
            .catch(err => {
                handleAPIError(err)
            })
    }, []);

    const deleteUser = (id) => {
        const modifiedUsersList = usersList.filter(e => e.login.uuid !== id);
        setUsers(modifiedUsersList);
    };

    const colorRows = () => setColoredRows(!coloredRows);

    const sortByCountry = () => {
        const sortedUsers = [...usersList];
        sortFlag === false ?
        sortedUsers.sort((a, b) => a.location.country.localeCompare(b.location.country))
        :
        sortedUsers.sort((a, b) => b.location.country.localeCompare(a.location.country));

        setSortFlag(!sortFlag);
        setUsers(sortedUsers)
    };

    const restoreInitState = () => {
        setUsers(initialState);
    };

  return (
      <div className="App">
        <h1>Interview task</h1>
        <button onClick={() => colorRows()}>Colored rows</button>
        <button onClick={() => sortByCountry()}>Sort by country</button>
        <button onClick={() => restoreInitState(usersList)}>Restore the init state</button>
        <UserList users={usersList} deleteUser={deleteUser} coloredRows={coloredRows}/>
        {error && <p>{`${error}`}</p>}
      </div>
  );
}

export default App;
