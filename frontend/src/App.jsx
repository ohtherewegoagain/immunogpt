import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState("mol");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/predict", {
      input,
      model,
    });
    setOutput(res.data.output);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">ImmunoGPT Prototype</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter sequence..." />
      <select value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="mol">Molecule Generator</option>
        <option value="tcr">TCR Predictor</option>
        <option value="vax">Vaccine Epitope</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
      <p>Output: {output}</p>
    </div>
  );
}

export default App;
