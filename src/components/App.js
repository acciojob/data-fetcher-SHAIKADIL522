import React from "react";
import "./../styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    fetch("https://dummyjson.com/products")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then(function (json) {
        if (!json || Object.keys(json).length === 0) {
          this.setState({ data: "No data found", error: null });
        } else {
          this.setState({ data: json, error: null });
        }
      }.bind(this))
      .catch(function (err) {
        this.setState({ error: err.message, data: null });
      }.bind(this));
  }

  render() {
    var content;
    if (this.state.error) {
      content = this.state.error;
    } else if (!this.state.data) {
      content = "No data found";
    } else {
      content = JSON.stringify(this.state.data, null, 2);
    }

    return (
      <div>
        {/* Do not remove the main div */}
        <pre>{content}</pre>
      </div>
    );
  }
}

export default App;