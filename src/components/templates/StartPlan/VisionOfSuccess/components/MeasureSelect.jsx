import React from 'react';
import { Select } from '@chakra-ui/react';
export default function MeasureSelect({ field }) {
  return (
    <>
      <Select border={'InactiveBorder'} {...field}>
        <option value="#">#</option>
        <option value="$">$</option>
      </Select>
    </>
  );
}
