import express from 'express';
import { getAllVerifiedCandidates, getAllVerifiedEnterprise, getAllVerifiedJobs, getAllVerifiedRecruitingAgencies } from '../controller/superadminController.js';

const router = express.Router();

router.get('/getenterprise', getAllVerifiedEnterprise);

router.get('/getrecruitingagencies', getAllVerifiedRecruitingAgencies);

router.get('/getjobs', getAllVerifiedJobs);

router.get('/getcandidates', getAllVerifiedCandidates);

export default router;
