import { Request, Response, NextFunction } from 'express';
import { z, ZodType } from 'zod';

export function validateBody<T extends ZodType>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      console.error('Validation error:', result.error);
      return res.status(400).json({ error: z.treeifyError(result.error) });
    }
    req.body = result.data;
    next();
  };
}
