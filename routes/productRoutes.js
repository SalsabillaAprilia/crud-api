const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('gambar'), productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.put('/:id', protect, upload.single('gambar'), productController.update);
router.delete('/:id', protect, productController.remove);

module.exports = router;