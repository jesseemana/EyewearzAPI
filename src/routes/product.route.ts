import { Router } from 'express';
import { requireAdmin, upload, validateInput } from '../middleware';
import { ProductController } from '../controllers';

const router = Router();

router.get('/', ProductController.getAllProductsHandler);

router.post('/edit/:id', [requireAdmin, validateInput], ProductController.editProductHandler);

router.get('/featured', ProductController.getFeaturedProductsHandler);

router.post('/filter/:query', ProductController.searchProductsHandler);

router.get('/:id', ProductController.getSingleProductHandler);

router.post('/create', [upload.single('file'), requireAdmin, validateInput], ProductController.createProductHandler);

export default router;
