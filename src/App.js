import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


function App() {
  let [gyroArr, setgyroArr] = useState([0,0,0])
  const gyroListener = (r, t, s) => {
    console.log(r,t,s)
    setgyroArr([r,t,s])
  }
  return (
    <div className="App">
          <div className="App-Background">
            <div id="circle1" style={{top: (gyroArr[1]-80)*2,left: (gyroArr[2])*2 }} className="circle"></div>
            <div id="circle2"style={{bottom: (gyroArr[1])*1,left: (gyroArr[2])+20*3 }} className="circle"></div>
            <div id="circle3" style={{top: (gyroArr[1]+45)*2,right: (gyroArr[2])*2 }} className="circle"></div>

          </div>
          <div className="App-Forground">
          </div>
          <img src={logo}></img>

      <Gyroscope listener={gyroListener} />
    </div>
  );
}



const Gyroscope = ({listener, children}) => {

  useEffect(() => {
    if(window.DeviceOrientationEvent){
      window.ondeviceorientation = e => handleOrientation(e);
    } else {
      console.log('Device Orientation: Not supported');
    }
  });

  Gyroscope.propTypes = {
    listener: PropTypes.func.isRequired,
  }

  const handleOrientation = (e) => {
    let rotate = e.gamma;
    let tilt = e.beta;
    let spin = e.alpha;
    listener(Math.round(rotate), Math.round(tilt), Math.round(spin));
  };


  return (
    <div className='gyroscope'>
      {children}
    </div>

  )
}

export default App;
