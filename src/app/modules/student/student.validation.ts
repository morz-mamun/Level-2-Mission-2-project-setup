import { z } from 'zod';

// Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().min(1).optional(),
  lastName: z.string().min(1),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required'),
  fatherOccupation: z.string().min(1, 'Father Occupation is required'),
  fatherContactNo: z.string().min(1, 'Father Contact No is required'),
  motherName: z.string().min(1, 'Mother Name is required'),
  motherContactNo: z.string().min(1, 'Mother Contact No is required'),
  motherOccupation: z.string().min(1, 'Mother Occupation is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian Name is required'),
  occupation: z.string().min(1),
  contactNo: z.string().min(1, 'Local Guardian Contact No is required'),
  address: z.string().min(1, 'Local Guardian Address is required'),
});

const studentValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().min(1),
  email: z.string().min(1, 'Email is required').email('Email is not valid'),
  contactNo: z.string().min(1, 'Contact No is required'),
  emergencyContactNo: z.string().min(1, 'Emergency Contact No is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1, 'Present Address is required'),
  permanentAddress: z.string().min(1, 'Permanent Address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().min(1).optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;
