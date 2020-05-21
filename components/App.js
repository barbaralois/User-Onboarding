import React, { useState, useEffect } from 'react';
import '../index.css';
import Form from './Form';
import User from './User';
import axios from 'axios';
import * as yup from 'yup';
import formSchema from '../validation/formSchema';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  tos: false,
};

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  tos: '',
};

const initialUsers = [];
const initialDisabled = true;

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewUser = (newUser) => {
    axios
      .post('https://reqres.in/api/users', newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const onInputChange = (evt) => {
    const { name } = evt.target;
    const { value } = evt.target;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onCheckboxChange = (evt) => {
    const { name } = evt.target;
    const { checked } = evt.target;

    setFormValues({
      ...formValues,
      [name]: checked,
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos === true,
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <Form
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        onCheckboxChange={onCheckboxChange}
        disabled={disabled}
        errors={formErrors}
        values={formValues}
      />
      {users.map((user, index) => {
        return <User key={index} details={user} />;
      })}
    </div>
  );
}
