import React, { forwardRef } from 'react';

export const InputCarts = forwardRef(({ label }, ref) => {
    return (
        <div className='w-full flex gap-2 text-white text-lg mt-1'>
            <input type='checkbox' ref={ref} className='cursor-pointer' />
            <h3>{label}</h3>
        </div>
    );
});

