import React from 'react';
import axios from 'axios';
import '../index.css';
import '../App.css';

class Airports extends React.Component {
  state = { details: [] };

  componentDidMount() {
    axios.get('http://localhost:8000/airport')  // Replace with the correct Django API URL
      .then(res => {
        this.setState({
          details: res.data
        });
      })

      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }

  render() {
    return (
      <div>
        <header>Data Generated From Django</header>
        <hr />
        {this.state.details.length > 0 ? (
          this.state.details.map((output, id) => (
            <div key={id}>
              <h2>{output.airportname}</h2>
              <h3>{output.airportcode}</h3>
            </div>
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
  }
}

export default Airports;
