import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = async () => {
    setError("");
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format");
      }
      const res = await axios.post(
        "https://testbfhl.herokuapp.com/bfhl",
        parsedData
      );
      setResponse(res.data);
      setShowDropdown(true);
    } catch (err) {
      setError("Invalid JSON format or API error");
      setResponse(null);
      setShowDropdown(false);
    }
  };

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const renderResponse = () => {
    if (!response) return null;

    const options = selectedOptions
      .map((option) => {
        switch (option.value) {
          case "alphabets":
            return { label: "Alphabets", value: response.alphabets };
          case "numbers":
            return { label: "Numbers", value: response.numbers };
          case "highest_lowercase_alphabet":
            return {
              label: "Highest Lowercase Alphabet",
              value: response.highest_lowercase_alphabet,
            };
          default:
            return null;
        }
      })
      .filter((option) => option !== null);

    return (
      <div>
        {options.map((option, index) => (
          <div key={index}>
            <h3>{option.label}</h3>
            <pre>{JSON.stringify(option.value, null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="10"
        cols="50"
        placeholder='Enter JSON here, e.g., {"data": ["A","C","z"]}'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showDropdown && (
        <Select
          isMulti
          options={[
            { label: "Alphabets", value: "alphabets" },
            { label: "Numbers", value: "numbers" },
            {
              label: "Highest Lowercase Alphabet",
              value: "highest_lowercase_alphabet",
            },
          ]}
          onChange={handleDropdownChange}
        />
      )}
      {renderResponse()}
    </div>
  );
};

export default App;
