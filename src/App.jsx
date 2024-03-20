import { useState } from 'react';
import './App.css';
import { PasswordGeneratorCart } from './Components/PasswordGeneratorCart';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full min-h-full overflow-y-scroll  bg-slate-800 '>
      <PasswordGeneratorCart />
    </div>
  )
}

export default App;
