const { z } = require('zod');

 const aadhaarStatusSchema = z.object({
  aadhaar: z
    .string()
    .regex(/^\d{12}$/, { message: 'Aadhaar must be exactly 12 digits' }),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'DOB must be in YYYY-MM-DD format',
    }),
});
module.exports = aadhaarStatusSchema;