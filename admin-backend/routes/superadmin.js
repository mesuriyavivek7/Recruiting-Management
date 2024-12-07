import express from 'express';
import { getAllVerifiedEnterprise, getAllVerifiedRecruitingAgencies } from '../controller/superadminController.js';

const router = express.Router();

router.get('/getenterprise', getAllVerifiedEnterprise);

router.get('/getrecruitingagencies', getAllVerifiedRecruitingAgencies);

export default router;
