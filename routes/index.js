var express = require('express');
var router = express.Router();
var path = require('path');
var Item = require('../models/ItemsModel');

// controller imports
// var index_controller = require('../controllers/indexController'); // no use for this yet

/* GET home page. */
router.get('/',function(req,res){
	res.sendFile(path.join(__dirname, '../views/index.html')); // not really needed right now
	// could also redirect to localhost:3000/index.html
});

module.exports = router;
