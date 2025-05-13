import React from 'react';
import './loader.css'; // le fichier CSS que tu vas créer juste après

const Loader = () => {
  const cells = [];
  for (let i = 1; i <= 37; i++) {
    cells.push(<div key={i} className={`gel c${i} ${i % 3 === 1 ? 'r1' : i % 3 === 2 ? 'r2' : 'r3'}`}>
      <div className={`hex-brick ${i % 3 === 1 ? '' : i % 3 === 2 ? 'h2' : 'h3'}`}></div>
    </div>);
  }

  return <div className="socket">{cells}</div>;
};

export default Loader;
