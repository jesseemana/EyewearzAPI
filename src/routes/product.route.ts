import { Router } from 'express';
import { requireAdmin, upload } from '../middleware';
import { ProductController } from '../controllers';

const router = Router();

router.get('/', ProductController.getAllProductsHandler);

router.get('/featured', ProductController.getFeaturedProductsHandler);

router.post('/filter/:query', ProductController.searchProductsHandler);

router.get('/:id', ProductController.getSingleProductHandlerandler);

router.post('/create', [upload.single('file'), requireAdmin], ProductController.createProductHandlerandler);

export default router;
