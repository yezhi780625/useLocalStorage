import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [count1, setCount1] = useLocalStorage("count", 123, {
    name: "count1",
    parse: Number
  });

  // const [count1], setC1] = useState(Number(localStorage.getItem(count1'') || 0));
  // const [c2, setC2] = useState(Number(localStorage.getItem('c2') || 0));

  // const handleC1Change = useCallback((v) => {
  //   const nv = Number(v)
  //   setC1(nv)
  //   localStorage.setItem('count1', nv)
  // }, [])

  // const handleC2Change = useCallback((v) => {
  //   const nv = Number(v)
  //   setC2(nv)
  //   localStorage.setItem('c2', nv)
  // }, [])

  // useEffect(() => {
  //   const onstorage = (e) => {
  //     if (e.key === 'count1') {
  //       setC1(Number(e.newValue))
  //     }

  //     if (e.key === 'c2') {
  //       setC2(Number(e.newValue))
  //     }
  //   }

  //   window.addEventListener('storage', onstorage)

  //   return () => window.removeEventListener('storage', onstorage)
  // }, [])

  return (
    <div className="App">
      <fieldset>
        <legend>Count 1</legend>
        <button onClick={() => setCount1(count1 - 1)}>-1</button>
        <span style={{ margin: "0 8px" }}>{count1}</span>
        <button onClick={() => setCount1(count1 + 1)}>+1</button>
      </fieldset>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
