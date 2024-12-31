import React from 'react';
import axios from 'axios';
import './index.css';
import './App.css';
import TopBar from './components/TopBar';
import Earth from './components/Earth';
import Title from './components/Title';
import SearchBar from './components/SearchBar';
import SearchButton from './components/SearchButton'
import Pictures from './components/Pictures'
import Footer from './components/Footer'

class App extends React.Component {
  state = { details: [] };

  componentDidMount() {
    axios.get('http://localhost:8000')  // Replace with the correct Django API URL
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
      <div className='flex flex-col justify-center items-center'>
        <TopBar />
        <Title />
        <Earth />
        <SearchBar />
        <SearchButton />
        <Pictures />
        <Footer />

      </div >
    );
  }
}

export default App;
