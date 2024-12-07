import { useState } from "react";

function useFormSpecifyInput() {
  const [currentVal, setCurrentVal] = useState("");
  const [entries, setEntries] = useState([]);
  function addEntry() {
    if(currentVal !== "") {
      setEntries(prev => [...prev, currentVal])
    }
  }
  function changeCurrentVal(value) {
      setCurrentVal(value)
  }
  function removeEntry(value) {
    setEntries(prev => prev.filter(el => el !== value))
  }
  return {
    changeCurrentVal,
    removeEntry,
    addEntry,
    entries
  }
}
export default useFormSpecifyInput;