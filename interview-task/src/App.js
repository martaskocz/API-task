import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function UserList({users, deleteUser, coloredRows}) {

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
            <tbody class={coloredRows}>
            {users && users.map((user) => (
                <tr key={user.login.uuid} className="tableRow">
                    <td><img src={user.picture.thumbnail}/></td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.location.country}</td>
                    <td><button type="button" onClick={() => deleteUser(user.login.uuid)}>delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}


function App() {

    useEffect(() => {
        const users = axios.get('https://randomuser.me/api?results=100')
            .then((response) => {
                setUsers(response.data.results);
                setInitialState(response.data.results);
            })
    }, []);

    const [usersList, setUsers] = useState([]);
    const [initialState, setInitialState] = useState([]);
    const [sortFlag, setSortFlag] = useState(true);

    const sortByCountry = (usersList) => {
        const sortedUsers = [...usersList];
        sortFlag === false ?
            sortedUsers.sort((a,b) => b.location.country.localeCompare(a.location.country))
            : sortedUsers.sort((a,b) => a.location.country.localeCompare(b.location.country));

        setUsers(sortedUsers);
        setSortFlag(!sortFlag);

        return sortedUsers
    };

    const deleteUser = (id) => {
        const restUsers = [...usersList].filter((e) => e.login.uuid !== id);

        setUsers(restUsers);
        return restUsers;
    };

    const restoreInitState = () => {
        setUsers(initialState);
    };

    const [coloredRows, setColoredRows] = useState("");

    const colorRows = () => {
        coloredRows === "" ? setColoredRows("coloredRows") : setColoredRows("");
    };

    return (
        <div className="App">
            <h1>Interview task</h1>
            <button onClick={() => colorRows()}>Colored rows</button>
            <button onClick={() => sortByCountry(usersList)}>Sort by country</button>
            <button onClick={() => restoreInitState()}>Restore the init state</button>
            <UserList users={usersList} deleteUser={deleteUser} coloredRows={coloredRows}/>
        </div>
    );
}

export default App;
