import express from 'express';
import { getAllVerifiedEnterprise } from '../controller/superadminController.js';

const router = express.Router();

router.get('/getenterprise', getAllVerifiedEnterprise);

export default router;
