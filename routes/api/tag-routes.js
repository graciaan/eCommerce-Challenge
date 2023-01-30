const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//finds all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }] 
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

//finds a single tag by its 'id'
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag
      }] 
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tags found with this ID number!'})
      return;
    };
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//creates a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

  //updates a tag's name by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: { 
        id: req.params.id 
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID number!' });
      return;
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(400).json(err)
  }
});

//deletes tag data
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID number!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
