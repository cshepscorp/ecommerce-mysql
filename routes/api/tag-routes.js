const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    // include its associated Product data
    include: [ {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          through: ProductTag,
          as: 'product_tags'
      }]
    })
    .then(dbTagData => {
      if (!dbTagData) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
      }
      res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    // be sure to include its associated Product data
    include: [ {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: ProductTag,
      as: 'product_tags'
    }]
  })
      .then(dbTagData => {
          if (!dbTagData) {
              res.status(404).json({ message: 'No tag found with this id' });
              return;
          }
          res.json(dbTagData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
        id: req.params.id
    },
    attributes: [
        'tag_name'
        ],
    include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    ]
    })
    .then(dbTagData => {
        if(!dbTagData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No tag with this id was found'});
            return;
    }
    res.json(dbTagData);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
        id: req.params.id
      }
    })
    .then(dbTagData => {
        if(!dbTagData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No tag with this id was found'});
            return;
    }
    res.json(dbTagData);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
