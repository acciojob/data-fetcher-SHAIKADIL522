import React from "react";
import "./../styles/App.css";

class App extends React.Component {
  state = {
    data: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await fetch("https://dummyjson.com/products");

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const json = await response.json();

      // Handle empty data properly
      if (!json || Object.keys(json).length === 0) {
        this.setState({
          data: [],
          error: null,
          loading: false,
        });
      } else {
        this.setState({
          data: json,
          error: null,
          loading: false,
        });
      }
    } catch (err) {
      this.setState({
        error: err.message,
        data: null,
        loading: false,
      });
    }
  }

  render() {
    const { data, error, loading } = this.state;

    return (
      <div>
        {/* Do not remove the main div */}

        {error ? (
          <pre>{`An error occurred: ${error}`}</pre>
        ) : loading ? (
          <pre>Loading...</pre>
        ) : data && Array.isArray(data) && data.length === 0 ? (
          <pre>{JSON.stringify(data)}</pre> // must be []
        ) : (
          <>
            <h3>Data Fetched from API</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </>
        )}
      </div>
    );
  }
}

export default App;