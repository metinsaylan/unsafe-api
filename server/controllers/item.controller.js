const Joi = require('joi');
const Items = require('../models/item.model');

exports.index = function (req, res) {

  console.log( req.body )
  console.log( req.query )

  var search = { active: true };
  projection = 'name created updated'
  limit = 10
  orderby = 'updated'
  order = '1'

  Items.find(
    search,
    projection,
    function( err, items ) {
      if (err) { 
        res.json({
          status: "error",
          message: err,
        });
      } else {

        // count of results
        Items.countDocuments( search, function(err, numberOfItems) {
          res.json({
            status: "success",
            message: "Items retrieved successfully.", 
            data: items,
            count: numberOfItems
          });
        });

      }
    })
    .sort({[orderby]: order})
    .limit(limit);
};

async function insert(req, res){

  if( !('name' in req.body ) ){
    res.status(400).json({
      status: "error",
      message: "name is required"
    })
  }

  item = req.body

  newItem = new Items( item )
  newItem.save(function (err, inserted ) {
    if (err){
      return res.status(500).json({
        status: "error",
        message: err
      })
    } else {
      return res.status(201).json({
        status: "ok",
        message: "New item is created",
        data: inserted.id
      })
    }
  })
};

exports.view = function (req, res) {
  Items.findById(req.params.item_id, function (err, item) {
    if (err){
      res.send(err);
    } else {
      res.json({
        message: 'Item details are loaded.',
        data: item
      });
    }
  })
};

async function update(req, res) {
  Items.findById( req.params.item_id, async function ( err, item ) {
    if (err) {
      res.send(err);
    } else {

      item.name = req.body.name

      item.updated = Date.now(); 

      item.save(function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json({
            message: 'Item updated.',
            data: item
          });
        }
      });
    }
  });
};

exports.delete = function (req, res) {
  Items.findById(req.params.item_id, function (err, item) {
    if (err) {
      res.send(err);
    } else {

      item.active = false
      item.updated = Date.now(); 

      item.save(function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json({
            message: 'Item deleted.',
            data: item
          });
        }
      });
    }
  });
};

async function patch(req, res) {

  Items.findById(req.params.item_id, async function (err, item) {
    if (err) {
      res.send(err);
    } else {

      if( req.body.hasOwnProperty('name') ){
        item.name = req.body.name
      }

      item.updated = Date.now(); 

      item.save(function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json({
            message: 'Item updated.',
            data: item
          });
        }
      });
    }
  });
};


// exports
exports.insert = insert
exports.update = update
exports.patch = patch
