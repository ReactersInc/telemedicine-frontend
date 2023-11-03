// src/App.tsx
import React from 'react';
import "./index.css"
import { Circle } from 'rc-progress';

function Test() {
  return (
    <div className="Circle" >
        <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/> 

        <div className="Label">99%</div>
    </div>
  );
}

export default Test;
