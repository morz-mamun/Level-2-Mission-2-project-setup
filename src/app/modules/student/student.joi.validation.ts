import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/, 'capitalize format')
    .messages({
      'string.base': 'First Name must be a string.',
      'string.empty': 'First Name is required.',
      'string.max': 'First Name is not allowed more than 20 characters.',
      'string.pattern.name': '{#label} is not in capitalize format',
    }),
  middleName: Joi.string().allow(''),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/, 'alpha')
    .messages({
      'string.empty': 'Last Name is required.',
      'string.pattern.name': '{#label} is not valid.',
    }),
});

// Joi schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContactNo: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

// Joi schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Joi schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{#label} is not valid',
  }),
  dateOfBirth: Joi.date().iso().messages({
    'date.format': '{#label} must be a valid ISO date.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '{#label} is not a valid email type.',
    'string.empty': 'Email is required.',
  }),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#label} is not a valid blood group',
    }),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
