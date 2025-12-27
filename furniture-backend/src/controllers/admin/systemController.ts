import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { errorCode } from '../../../config/errorCode';
import { createOrUpdate } from '../../services/settingService';
import { createError } from '../../utils/error';
interface CustomRequest extends Request {
  user?: any;
}
export const setMaintenace = [
  body('mode', 'Mode must be boolean').isBoolean(),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return createError('Invalid Phone number', 401, errorCode.invalid);
    }

    const { mode } = req.body;
    const value = mode ? 'true' : 'false';
    const message = mode
      ? 'Sucessfully set Maintenance mode'
      : 'Successfully turn off Maintenance mode';
    await createOrUpdate('maintenance', value);
    res.status(200).json({ message });
  },
];
