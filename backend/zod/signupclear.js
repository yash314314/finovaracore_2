const { z } = require('zod');

 const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be at most 20 characters' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
    role: z.enum(['admin', 'user','retailer'], {
      errorMap: () => ({ message: 'Role must be either "admin" , "retailer" or "user"' }),
    }),
});

module.exports = signupSchema;