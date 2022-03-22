import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UsersForm = ({ getUser, userSelected, setUserSelected }) => {
  const { register, handleSubmit, reset} = useForm();
  useEffect(() => {
    if (userSelected) {
      reset({
        first_name: userSelected.first_name,
        last_name: userSelected.last_name,
        email: userSelected.email,
        birthday: userSelected.birthday,
        password: userSelected.password,
      });
    }
  }, [userSelected]);

  const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    birthday: "",
    password: "",
  };
  const submit = (user) => {
    if (userSelected) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          user
        )
        .then(() => {
          getUser();
          setUserSelected(null);
        });
      reset(defaultValues);
    } else {
      axios.post("https://users-crud1.herokuapp.com/users/", user).then(() => {
        getUser();
        reset(defaultValues);
      });
    }
  };

  return (
    <form className="form_register_user" onSubmit={handleSubmit(submit)}>
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
            {...register("first_name")}
          />
        </div>
        <div className="form_register-lastname">
          <input
            type="text"
            name="lasName"
            placeholder="lastName"
            id="lastName"
            {...register("last_name")}
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
          {...register("email")}
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
          {...register("password")}
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
          {...register("birthday")}
        />
      </div>
      <div className="form_register_button">
        {userSelected ? <button id="Modify">Modify</button> : 
        <button id="Register">Register</button>}
      </div>
    </form>
  );
};

export default UsersForm;
