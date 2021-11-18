const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  console.log('======================');
    Category.findAll({
        // Query configuration
        attributes: [
            'id', 
            'category_name'
        ],
        include: [ // Instead of using complex JOIN statements with SQL, we can call on Sequelize's include option to perform the join for us.
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }
        ]
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  // be sure to include its associated Products
  Category.findOne({
    where: {
        id: req.params.id
    },
    attributes: [
        'id', 
        'category_name'
        ],
    include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    ]
    })
    .then(dbCategoryData => {
        if(!dbCategoryData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No category with this id was found'});
            return;
    }
    res.json(dbCategoryData);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
        id: req.params.id
    },
    attributes: [
        'id', 
        'category_name'
        ],
    include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    ]
    })
    .then(dbCategoryData => {
        if(!dbCategoryData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No category with this id was found'});
            return;
    }
    res.json(dbCategoryData);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
        id: req.params.id
      }
    })
    .then(dbCategoryData => {
        if(!dbCategoryData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No category with this id was found'});
            return;
    }
    res.json(dbCategoryData);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
