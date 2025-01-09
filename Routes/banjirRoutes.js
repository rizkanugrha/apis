import express from 'express';
import {
    getAllBanjir,
    createNewBanjir,
    findBanjirById,
    updateBanjir,
    deleteBanjir,
} from '../Controllers/banjirControllers.js';

const router = express.Router();

router.get('/', getAllBanjir);
router.post('/', createNewBanjir);
router.get('/:id', findBanjirById);
router.patch('/:id', updateBanjir);
router.delete('/:id', deleteBanjir);

export default router;
