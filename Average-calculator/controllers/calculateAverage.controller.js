const express = require("express");
//const axios = require("axios");

const VALID_ID= ['p', 'f', 'e', 'r'];

//import the methods from the helper
const { fetchNums, updateWindow, calcAverage } = require('../helpers/fetchNums.helper');
// const app = express();

  exports.calculateAverage=async (req, res) => {
    const { numberid } = req.params;

    if (!VALID_ID.includes(numberid)) {
      return res.status(400).json({ error: 'Invalid number ID' });
    }

    const newNumbers = await fetchNums(numberid);
    const windowPrevState = updateWindow(newNumbers);
    const avg = calcAverage(windowData);

    res.json({
      windowPrevState,
      windowCurrState: [...windowData],
      numbers: newNumbers,
      avg 
    });
  };

