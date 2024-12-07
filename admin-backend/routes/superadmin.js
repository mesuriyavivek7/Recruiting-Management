import express from 'express';
import { getAllVerifiedEnterprise, getAllVerifiedJobs, getAllVerifiedRecruitingAgencies } from '../controller/superadminController.js';

const router = express.Router();

router.get('/getenterprise', getAllVerifiedEnterprise);

router.get('/getrecruitingagencies', getAllVerifiedRecruitingAgencies);

router.get('/getjobs', getAllVerifiedJobs);

export default router;
