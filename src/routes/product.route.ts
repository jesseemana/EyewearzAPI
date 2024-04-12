import { Router } from 'express';
import { require_admin, upload } from '../middleware';
import { ProductController } from '../controllers';

const router = Router();

router.get('/', ProductController.getAllProductsHandler);

router.post('/filter/:query', ProductController.searchProductsHandler);

router.get('/:id', ProductController.getSingleProductHandlerandler);

router.post('/create', [upload.single('file'), require_admin], ProductController.createProductHandlerandler);

export default router;
