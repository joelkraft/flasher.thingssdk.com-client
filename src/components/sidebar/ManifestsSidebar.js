import React from 'react';
import FilterContainer from './FilterContainer';

const filters = [
  { printName: 'All Manifests', filterName: 'ALL'},
  { printName: 'My Manifests', filterName: 'MY'}
];

export default () => {
    return (
        <div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            {filters.map((filter, index) => {
              return <FilterContainer
                key={index}
                text={filter.printName}
                filterName={filter.filterName}
              />
            })}
          </ul>
        </div>
    );
}