import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
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
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstname">Firstname</label>
          <input id="firstname" name="firstname" type="text" />

          <label htmlFor="lastname">Lastname</label>
          <input id="lastname" name="lastname" type="text" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />

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

          <button>Send data!</button>
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
