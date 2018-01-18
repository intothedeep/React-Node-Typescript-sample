import * as express from 'express';
import { Request, Response } from "express";
import * as path from 'path';
import * as apiController from '../controllers/api';

const router = express.Router();

router.get('/', apiController.list);

export = router;
