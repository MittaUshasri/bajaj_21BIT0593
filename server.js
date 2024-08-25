const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// POST endpoint
app.post("/bfhl", (req, res) => {
  const data = req.body.data;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: [],
      alphabets: [],
      highest_lowercase_alphabet: [],
    });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));

  const lowercaseAlphabets = alphabets.filter((c) => c === c.toLowerCase());
  const highestLowercaseAlphabet =
    lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

  res.json({
    is_success: true,
    user_id: USER_ID,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
