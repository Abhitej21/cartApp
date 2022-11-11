import React from 'react';
import { Checkbox } from 'rsuite';

const FilterCheckbox = ({id,name,checked,onChange,label}) => {
  return (
    <div>
        <Checkbox
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        label={label}
        >{label}</Checkbox>
        
    </div>
  );
};

export default FilterCheckbox;