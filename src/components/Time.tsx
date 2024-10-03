import React from 'react';
import { DateTimePicker } from './ui/date-time-picker/date-time-picker';


export function Time() {
  return (
    <>
      <main className='mt-2'>
        <DateTimePicker granularity={"minute"} />
      </main>
    </>
  );
};

export default Time;

