import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      // Add your signup logic here
      console.log('Form submitted:', values);
    },
  });

  return (
      <div className='bg-white h-96 w-96 flex  justify-center'>
        <div className='flex flex-col'>
          <div className=''>
          <image>logo </image>
          <h1>HII</h1>
          </div>
          <div className=' flex flex-col p-2 w-60'>
            <label className='text-left'>Email</label>
          <input type="text" placeholder='Email address'/> 
          <label className='text-left' >Password</label>
          <input type="text" placeholder='Create password'/> 
          <button>Continue</button>
          <p>OR</p>
          <button>Continue with Facebook</button>
          <button>Continue with Google</button>
        </div>
        </div>
        

      </div>


  );
};

export default SignupPage;
