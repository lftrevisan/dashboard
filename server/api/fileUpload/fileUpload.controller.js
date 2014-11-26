'use strict';

var _ = require('lodash');

// Creates a new fileUpload in the DB.
exports.create = function(req, res) {
	return res.send(200);
};

function handleError(res, err) {
  return res.send(500, err);
}