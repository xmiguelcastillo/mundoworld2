import React from 'react';
import axios from 'axios';
import './index.css';
import './App.css';
import TopBar from './components/TopBar';
import ResultBox from './components/ResultBox'
class Results extends React.Component {
  state = { details: [] };
  render() {
    return (
      <div className='flex flex-col justify-center items-center'>
        <TopBar />
        <ResultBox />

        <hr />
      </div>
    );
  }
}

export default Results;
