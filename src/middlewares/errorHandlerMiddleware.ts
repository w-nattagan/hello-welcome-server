import { NextFunction, Request, Response } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.message === 'Email or username already exists') {
    return res.status(400).json({ error: 'Email or username already exists' });
  }
  else if (err.message === 'Title already exists') {
    return res.status(400).json({ error: 'Title already exists' });
  }
  else {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default errorHandler;
