const {Router } = require('express');
const router = Router();
const validacion = require('../validaciones.js');
const catalogo = require('../controllers/catalogo.controller');
const detalle = require('../controllers/detalle.controller');
const marketplace = require('../controllers/marketplace.controller');
const producto = require('../controllers/producto.controller');
const storage = require('../controllers/multer_producto')
const multer = require('multer');
const uploader = multer ({ storage }).single('file');

//catalogo
router.get('/catalogo',catalogo.getcatalogo);
//detalle 
router.get('/detalle',detalle.getdetalleprod);
router.post('/registrarDetalle',detalle.registro);
//productos
router.get('/producto',producto.getproductos);
router.get('/producto/:id_producto',producto.getproducto);
router.post('/registrarProducto',uploader,producto.registro);
router.put('/updateProducto/:id_producto',uploader,producto.update);
router.delete('/deleteProductos/:id_producto',producto.delete);

//marketplace
router.get('/marketplace',marketplace.getmarketplaces);
router.post('/registrarMarkeplace',marketplace.registro);
router.put('/updateMarketplace/:id_mark',marketplace.update);
router.delete('/deleteMarketplace/:id_mark',marketplace.delete);

module.exports= router;