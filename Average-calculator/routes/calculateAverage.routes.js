const calculateAverage= require("../controllers/calculateAverage.controller");
const express = require("express");
const router = express.Router();

router.route('/numbers/:numberid').get(calculateAverage.calculateAverage);


module.exports = router;