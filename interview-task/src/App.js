import React, { useState, useEffect, useRef } from 'react';

const App = () => {

  // EXAMPLE
  // const [timer, setTimer] = useState(0);
  // useEffect(()=>{
  //   const interval = setInterval(()=>setTimer(currenttimer => currenttimer +1), 1000)
  //   console.log(interval);
  //   return () => clearInterval(interval);
  // }, []);
  // return <div>{timer}</div>


  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(!toggle);
  return(
    <Toggler toggle={toggle} onToggle={handleToggle}/>
  )
};

const Toggler = ({toggle, onToggle}) => {

  const [title, setTitle] = useState('');
  const calledOnce = useRef(false);

  useEffect(()=> {
    if (calledOnce.current){
      return;
    }
    if (toggle === true){
      console.log('I run only here');
      calledOnce.current = true;
    }
  }, [toggle]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return(
    <div>
      <input type="text" value={title} onChange={handleChange}/>
      <button onClick={onToggle}>Toggle</button>
      {toggle && <p>Hi there {title}!</p>}
    </div>
  )
};

export default App;
