const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

axios.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN;

// const numberid = 'e';

const windowSize = 10;
let windowData = [];


const fetchNums = async (numberid) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 500);

  try {
    const response = await axios.get(`http://20.244.56.144/test/${numberid}`, {
      signal: controller.signal,
      timeout: 500
    });
    clearTimeout(timeout);
    console.log(response.data.numbers);
    return response.data.numbers || [];
  } catch (error) {
    clearTimeout(timeout);
    return [];
  }
};

const updateWindow = (newNumbers) => {
  const prevState = [...windowData];
  for (const num of newNumbers) {
    if (!windowData.includes(num)) {
      if (windowData.length >= windowSize) {
        windowData.shift();
      }
      windowData.push(num);
    }
  }
  return prevState;
};

const calculateAverage = (arr) => {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((a, b) => a + b, 0);
  return parseFloat((sum / arr.length).toFixed(2));
};


exports.fetchNums = fetchNums;
exports.updateWindow = updateWindow;
exports.calculateAverage = calculateAverage;
exports.windowData = windowData;
