import React from 'react';
import './listSort.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListOl, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const upIcon = <FontAwesomeIcon icon={faSortUp} color="#22b8cf" size="sm" />;
const downeIcon = <FontAwesomeIcon icon={faSortDown} color="#22b8cf" size="sm" />;
const listIcon = <FontAwesomeIcon icon={faListOl} color="#22b8cf" size="sm" />;

const Sort = ({ ascSort, nowSort }) => {
  if (nowSort === '오름차순') {
    return (
      <div onClick={() => ascSort()} className="sortTest">
        {listIcon}&nbsp;{upIcon}
      </div>
    );
  } else {
    return (
      <div onClick={() => ascSort()} className="sortTest">
        {listIcon}&nbsp;{downeIcon}
      </div>
    );
  }
};

export default Sort;
