import React, { useEffect, useState } from 'react';
import axios from 'axios'

const UsersForm = ({ getUser, userSelected, setUserSelected }) => {
  const [firstName, setFirtsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  useEffect(() => {
    if (userSelected){
      setFirtsName(userSelected.first_name)
      setLastName(userSelected.last_name);
      setEmail(userSelected.email)
      setPassword(userSelected.password)
      setBirthday(userSelected.birthday)
     
    }

  },[userSelected])
  const submit = (e) => {
    e.preventDefault();
    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      birthday,
      password,
    };
    if (userSelected) {
      axios
        .put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`,user)
        .then(() => {
          getUser();
          setUserSelected(null);
        });
    } else {

      axios
        .post("https://users-crud1.herokuapp.com/users/", user)
        .then(() => {
          getUser();
          setFirtsName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setBirthday("");
        })
        .catch((error) => console.log(error.response));
    }
  };
  const reset = () => {
    setUserSelected(null);
    setFirtsName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setBirthday("");
  };
  return (
    <form className="form_register_user" onSubmit={submit}>
      <h1>New user</h1>
      <div className="form_register_users">
        <div className="form_register_icon">
          <label htmlFor="name">
            <i className="fa fa-solid fa-user"></i>
          </label>
        </div>
        <div className="form_register_name">
          <input
            type="text"
            name="name"
            placeholder="Name"
            id="name"
            onChange={(e) => setFirtsName(e.target.value)}
            value={firstName}
          />
        </div>
        <div className="form_register-lastname">
          <input
            type="text"
            name="lasName"
            placeholder="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
      </div>
      <div className="form_register_email">
        <label htmlFor="email">
          <i className="fa-solid fa-envelope"></i>
        </label>

        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="form-register_passw">
        <label htmlFor="password">
          <i className="fa-solid fa-key"></i>
        </label>

        <input
          type="password"
          name="password"
          placeholder="your password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className="form_register_bth">
        <label htmlFor="birthday">
          <i className="fa-solid fa-cake-candles"></i>
        </label>

        <input
          type="date"
          name="birthday"
          id="birthday"
          onChange={(e) => setBirthday(e.target.value)}
          value={birthday}
        />
      </div>
      <div className="form_register_button">
        <button>Submit</button>
        <button onClick={() => reset()} type="button">
          Clear
        </button>
      </div>
    </form>
  );
};

export default UsersForm;