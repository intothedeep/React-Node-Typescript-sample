import { Response, Request, NextFunction } from "express";

export let list = (req: Request, res: Response) => {

  res.send({ 
    list: "api.list from controllers!"
  });

};
