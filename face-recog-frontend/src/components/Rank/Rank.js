import React from 'react';

const Rank = ({ name, enteries }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, your current entry enteries is...`}
      </div>
      <div className='white f1'>
        {enteries.toString()}
      </div>
    </div>
  );
}

export default Rank;