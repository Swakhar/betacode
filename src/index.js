import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      formErrors: { email: '', firstname: '', lastname: '' },
      emailValid: false,
      firstnameValid: false,
      formValid: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let firstnameValid = this.state.firstnameValid;
    let lastnameValid = this.state.lastname;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'firstname':
        firstnameValid = value.length > 0;
        fieldValidationErrors.firstname = firstnameValid ? '': ' need to be present';
        break;
      case 'lastname':
        lastnameValid = value.length > 0;
        fieldValidationErrors.lastname = lastnameValid ? '': ' need to be present';
        break;
      default:
        break;
    }
    this.setState({ emailValid: emailValid,
                    firstnameValid: firstnameValid,
                    lastnameValid: lastnameValid,
                    formErrors: fieldValidationErrors,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState(
      {
        formValid: this.state.emailValid && this.state.firstnameValid && this.state.lastnameValid
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    this.setState({
      profile: stringifyFormData(data)
    });

    // fetch("https://api.dummyendpoint/me/profile", {
    //   method: "PUT",
    //   body: data
    // });
  }

  render() {
    return (
      <div className="App">
        <div className="panel panel-default">
          {Object.keys(this.state.formErrors).map((fieldName, i) => {
            if(this.state.formErrors[fieldName].length > 0){
              return (
                <p key={i}>{fieldName} {this.state.formErrors[fieldName]}</p>
              )        
            } else {
              return '';
            }
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstname">Firstname</label>
          <input id="firstname" name="firstname"
           type="text" value={this.state.firstname} onChange={this.handleUserInput} />

          <label htmlFor="lastname">Lastname</label>
          <input id="lastname" name="lastname"
           type="text" value={this.state.lastname} onChange={this.handleUserInput} />

          <label htmlFor="email">Email</label>
          <input id="email" name="email"
           type="email" value={this.state.email} onChange={this.handleUserInput} />

          <label htmlFor="birthdate">Birth date</label>
          <input id="birthdate" name="birthdate" type="text" />

          <label htmlFor="job_title">Job Title</label>
          <input id="job_title" name="job_title" type="text" />

          <label htmlFor="years_of_expereince">Years of Experience</label>
          <input
            id="years_of_expereince"
            name="years_of_expereince"
            type="number"
          />

          <button disabled={!this.state.formValid}>Send data!</button>
        </form>

        {this.state.profile && (
          <div>
            <pre>FormData {this.state.profile}</pre>
          </div>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }

  return JSON.stringify(data, null, 2);
}
