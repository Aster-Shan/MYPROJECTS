export const checkUserExist = (user: any) => {
  if (user) {
    const error: any = new Error('Phone Number is already registered');
    error.status = 409;
    error.code = 'Error_NotFound';
    throw error;
  }
};
