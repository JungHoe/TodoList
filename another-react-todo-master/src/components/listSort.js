import React from 'react';
import './listSort.css';

const Sort = ({ ascSort, nowSort }) => {
  return (
    <div onClick={() => ascSort()} className="sortTest">
      {nowSort}
    </div>
  );
};

export default Sort;
