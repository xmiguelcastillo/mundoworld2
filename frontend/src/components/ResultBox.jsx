import React from "react";
import "../App.css";
import axios from 'axios';
import PurchsaseButton from '../components/PurchaseButton';
import PurchaseButton from "../components/PurchaseButton";

class ResultBox extends React.Component {
  state = { details: [] };

  componentDidMount() {
    // Fetch data from the Django API
    axios.get('http://localhost:8000/flights')  // Replace with the correct Django API URL
      .then(res => {
        this.setState({
          details: res.data  // Store the flight data in state
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }

  render() {
    return (
      <div className=''>
        {/* Check if there are flight details to display */}
        {this.state.details.length > 0 ? (
          this.state.details.map((flight, id) => (
            <div key={id}>
              <div className="bg-red-800 flex flex-row w-[1000px] h-[200px] border-black rounded-xl border-4 mt-3">

                {/* Left side showing departure information */}
                <div className="flex flex-col bg-sky-600 h-full w-1/5">
                  <div className="w-full text-shadow h-1/2 bg-purple-950 justify-center flex items-center text-center">
                    {flight.airline}
                  </div>
                  <div className="w-full text-shadow h-2/3 bg-green-600  flex flex-col items-center text-center">
                    <div className="h-1/2 w-full bg-yellow-300 ">Depart: {flight.depart_date}</div>
                    <div className="h-1/2 w-full bg-pink-500 ">Return: {flight.return_date}</div>
                  </div>
                </div>



                {/* Middle Section */}
                <div className="bg-sky-800 w-3/5 h-full flex flex-col">
                  <div className="bg-pink-500 w-full h-1/2">
                    {flight.depart_location.airportname}
                    {flight.return_location.airportname}
                  </div>

                  <div className="bg-white  w-full h-2/3">

                    <div className="bg-indigo-700 text-shadow-sm w-full h-1/2">
                      Depart Time:{flight.depart_time}
                    </div>
                    <div className="bg-yellow-400 text-shadow w-full h-1/2">

                      Return Time:{flight.return_time}
                    </div>
                  </div>
                </div>


                {/* Right Section */}


                <div className="flex flex-col bg-sky-600 h-full w-1/5">
                  <div className="w-full text-shadow h-1/2 bg-purple-950 justify-center flex items-center text-center">
                    ${flight.price_flight}.00
                  </div>
                  <div className="w-full text-shadow h-1/2 bg-green-600 justify-center flex items-center text-center">
                    <PurchaseButton />
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
  }
}

export default ResultBox;
