export const checkUserExist = (user: any) => {
  if (user) {
    const error: any = new Error('Phone Number is already registered');
    error.status = 409;
    error.code = 'Error_NotFound';
    throw error;
  }
};
export const checkOtpErrorIfSameDate = (
  isSameDate: boolean,
  errorCount: number,
) => {
  if (isSameDate && errorCount === 5) {
    const error: any = new Error(
      'OTP is wrong for 5 times.Please try again later',
    );
    error.status = 401;
    error.code = 'Erorr_OTPMaximunRequest';
    throw error;
  }
};
export const checkOtpRow = (otpRow: any) => {
  if (!otpRow) {
    const error: any = new Error('Phone number is not correct');
    error.status = 400;
    error.code = 'Invalid';
    throw error;
  }
};
export const checkUerIfNotExit = (user: any) => {
  if (!user) {
    const error: any = new Error('This Phone Number is not registered');
    error.status = 401;
    error.code = 'Unauthenticated';
    throw error;
  }
};
