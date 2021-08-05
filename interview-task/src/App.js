import './App.css';

function UserList(props) {
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
        <tbody>

        </tbody>
      </table>
  );
}


function App() {
  return (
      <div className="App">
        <h1>Interview task</h1>
        <button>Colored rows</button>
        <button>Sort by country</button>
        <button>Restore the init state</button>
        <UserList />
      </div>
  );
}

export default App;
