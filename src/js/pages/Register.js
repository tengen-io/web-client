// Sign up, sign in

import React, { Component } from 'react';
import Input from '../components/input';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const URL = 'http://example.com/answer';

const RegisterHero = () => (
  <div className="hero has-text-centered">
    <div className="hero-body">
      <p className="title">Welcome</p>
      <p className="subtitle">
        Create an account or sign in to an existing one
      </p>
    </div>
  </div>
);

function createUser(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  })
  .then(response => response.json()) // parses response to JSON
}

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // combine these two
  handleChange(field) {
    console.log(field)
    // this.setState(field);
  }

  handleSubmit() {
    // createUser(URL, this.state)
    //   .then(data => console.log(data)) // JSON from `response.json()` call
    //   .catch(error => console.error(error))
    console.log(this.state)
  }


  renderForm() {
    return( <section className="page page--registration">
      <RegisterHero />

      <div className="columns is-centered">
        <form className="column is-one-third"
              onSubmit={e => {
                    e.preventDefault();
                    addTodo(this.handleSubmit());
                    input.value = "";
                  }}>
          <Input type="text" 
                label="Username" 
                value={this.state.username} 
                onChange={this.handleChange} 
                placeholder="username" />
          <Input type="email" 
                label="Email" 
                value={this.state.email} 
                onChange={this.handleChange} 
                placeholder="name@example.com" />
          <Input type="password" 
                label="Password" 
                value={this.state.password} 
                onChange={this.handleChange} 
                placeholder="" />
          <Input type="password" 
                label="Confirm password" 
                value={this.state.passwordConfirm} 
                onChange={this.handleChange} 
                placeholder="" />
          <button className="button">Create account</button>
        </form>
      </div>
    </section>
    )
  }

  render() {
    return <div></div>
  }

};
    // taken from the render() return 
    //  <Mutation mutation={CREATE_USER}>
    //   {(addTodo, { data }) => (
    //     <div>
    //       <form
            
    //       >
    //         <input
    //           ref={node => {
    //             input = node;
    //           }}
    //         />
    //         <button type="submit">Add Todo</button>
    //       </form>
    //     </div>
    //   )}
    // </Mutation>

export default class RegisterPage extends React.Component {
  render() {
    return <FormComponent />;
  }
}

// mutation CreateUser {
//   createUser(username: "ian", email: "ian@ian.ian", password: "tinkertaylor", passwordConfirmation: "tinkertaylor") {
//     id
//     token
//   }
// }

// {
//   "data": {
//     "createUser": {
//       "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJnb19zdG9wX3dlYiIsImV4cCI6MTUyOTY0MDg2OCwiaWF0IjoxNTI3MjIxNjY4LCJpc3MiOiJnb19zdG9wX3dlYiIsImp0aSI6ImVjMjdiODljLWIyZDgtNDkwZC05M2NmLTA1MjVmMjhiZTVlOCIsIm5iZiI6MTUyNzIyMTY2Nywic3ViIjoiMTciLCJ0eXAiOiJhY2Nlc3MifQ._0jNoqgZT174HhpAKN_-sB9DdWmusLl5t0moJ2PXd1_DW1rY8pu3z-K7YnwSI8BBBoJrRvyPYHQc862PsVD-cQ",
//       "id": "17"
//     }
//   }
// }

// const CREATE_USER = gql`
//   mutation CreateUser {
//     createUser(${this.state}) {
//       id
//       token
//     }
//   }`