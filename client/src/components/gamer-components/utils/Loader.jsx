import React from 'react';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '4px solid pink',
          borderTop: '4px solid transparent',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
    </div>
  );
};

export default Loader;
