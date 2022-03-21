
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import UsersForm from './Components/UsersForm';
import UsersList from './Components/UsersList';

function App() {
   const [users, setUsers] = useState([]);
   const [userSelected, setUserSelected] = useState(null);
   useEffect(() => {
     axios
       .get("https://users-crud1.herokuapp.com/users/")
       .then((res) => setUsers(res.data));
   }, []);
   const getUsers = () => {
     axios
       .get("https://users-crud1.herokuapp.com/users/")
       .then((res) => setUsers(res.data));
   };
     const removeUser = (id) => {
       axios
         .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
         .then(() => getUsers());
     };
  return (
    <div className="App">
     <div className="form_register">
      <UsersForm
        getUser={getUsers}
        userSelected={userSelected}
        setUserSelected={setUserSelected}
      />
     </div>
     <div className="list_user">
      <UsersList
        users={users}
        setUserSelected={setUserSelected}
        removeUser={removeUser}
        
      />
     </div>
    </div>
  );
}

export default App;
