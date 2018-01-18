import * as express from 'express';
import { Request, Response } from "express";
import * as path from 'path';
const router = express.Router();

// GET Index
router.get('/', ( req:Request, res:Response ) => {
  // console.log(path.join(__dirname, "../../index.html"));
  res.sendFile(path.join(__dirname, "../../index.html"));
});

export = router;
