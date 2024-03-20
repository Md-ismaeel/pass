import React, { useRef, useState, useCallback } from 'react';
import { InputCarts } from './InputCarts';

export const PasswordGeneratorCart = () => {
    const upper = useRef();
    const lower = useRef();
    const symbol = useRef();
    const number = useRef();
    const [range, setRange] = useState(8);
    const [password, setPassword] = useState('');
    const passwordRef = useRef(null)

    const data = [
        { label: "Includes upperCase", charName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', ref: upper },
        { label: "Includes lowerCase", charName: 'abcdefghijklmnopqrstuvwxyz', ref: lower },
        { label: "Includes symbols", charName: '!@#$&*%^~{}[]', ref: symbol },
        { label: "Includes numbers", charName: '0123456789', ref: number }
    ];


    const passwordGenerate = useCallback(() => {
        if (range < 8 || range > 99) {
            alert('Length should be in range');
            return;
        }

        const filteredCheckList = data.filter(item => item.ref.current.checked);
        if (filteredCheckList.length === 0) {
            alert('Select at least one checkbox');
            return;
        }

        let str = '';
        filteredCheckList.forEach(item => {
            str += item.charName;
        });

        let newPassword = '';
        for (let i = 0; i < range; i++) {
            newPassword += str.charAt(Math.floor(Math.random() * str.length));
        }
        setPassword(newPassword);

    }, [range, data]);



    const rangeSetter = useCallback((e) => {
        setRange(e.target.value);
    }, []);

    const copyPassword = useCallback(() => {
        if (password === '') {
            alert('Password has not been generated yet!!');
        } else {
            passwordRef.current.select();
            passwordRef.current.setSelectionRange(0, 100);
            window.navigator.clipboard.writeText(password);
            alert('Password copied to clipboard!');
            passwordRef.current.focus();
        }
    }, [password]);


    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <div className='w-2/5 bg-slate-600 p-10 rounded-md'>
                <label>
                    <h1 className='text-white text-2xl mb-4'>Password Generator</h1>

                    <input type='text' placeholder='password' value={password} ref={passwordRef} readOnly className='w-4/5 h-10 bg-white rounded-l-md px-4 py-3 outline-none' />

                    <button onClick={copyPassword} className='bg-blue-600 w-20 h-10 text-center text-white rounded-r-md active:bg-blue-800'>Copy</button>

                </label>
                <div className='w-full flex gap-8 mt-4 justify-start items-center text-white'>
                    <div>
                        <input type='range' min={8} max={99} value={range} onChange={rangeSetter} className='w-48 mr-2' />
                        <span>{range}</span>
                    </div>
                    <p className='w-42'>
                        select Password length<br />
                        <b>(**8-100 characters**)</b>
                    </p>
                </div>
                <div className='w-full flex flex-col gap-1 mt-3'>
                    {data.map((item, index) => (
                        <InputCarts key={index} label={item.label} value={item.charName} ref={item.ref} />
                    ))}
                </div>
                <div className='text-center text-white mt-6'>
                    <button onClick={passwordGenerate} className='bg-blue-600 active:bg-blue-900 w-1/2 h-10 rounded-md text-lg'>Generate Password</button>
                </div>
            </div>
        </div>
    );
};
