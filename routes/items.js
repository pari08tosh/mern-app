const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const jwt = require('../JWTMiddleware');

router.get('/', (req, res) => {
    Item.getItems()
      .then(items => {
        return res.json({
          data: items
        });
      })
      .catch(err => {
        console.error(`Error fetching data - ${err}.`);
        return res.status(500).json({
          message: `Could not fetch Items.`
        });
      });
});

router.post('/insertItem', jwt, (req, res) => {
    Item.checkItem(req.body.name)
      .then(item => {
        if(item) {
          return res.status(400).json({
            message: `Item name already exists` 
          });
        } else {
          const newItem = new Item({
            name: req.body.name,
            description: req.body.description
          });
      
          Item.insertItem(newItem)
            .then(newItem => {
              return res.json({
                message: `Item Inserted Successfully.`
              });
            })
            .catch(err => {
              console.log(err);
              return res.status(400).json({
                message: `Error Inserting New Item.`
              });
            });
        };
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          message: `Error Inserting New Item`
        });
      });
});

module.exports = router;