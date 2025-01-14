const yup = require('yup')

exports.registerSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  firstName: yup.string().required('FirstName is required'),
  lastName: yup.string().required('lastName is required'),
  phoneNumber: yup.string().required('PhoneNumber is required'),
  role: yup.string()
  .oneOf(['Admin', 'User'], 'Role must be either admin or user')
  .required('Role is required')
 
});

exports.loginSchema = yup.object({
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
   
  });

  exports.kycnSchema = yup.object({
    name: yup.string().required('FirstName is required'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    idDocument: yup.mixed()
    .required('ID document is required') 
    .test('fileType', 'Invalid file type', (value) => {
      const allowedTypes = ['image/jpeg','image/jpg', 'image/png', 'application/pdf']; 
      return value && allowedTypes.includes(value.mimetype);
    })
    .test('fileSize', 'File size is too large', (value) => {
      return value && value.size <= 5 * 1024 * 1024;
    }),
   
  });