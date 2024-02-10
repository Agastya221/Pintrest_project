import { useFormik } from 'formik';
import * as Yup from 'yup';
import PinterestLogo from "../assets/pintrestlogo.svg";
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
    <div className="bg-white h-5/6 w-1/4 flex py-7  rounded-3xl justify-center">
      <div className="flex flex-col items-center ">
        <div className=" flex flex-col items-center">
          <img className="w-10" src={PinterestLogo}></img>
          <h1 className=" text-3xl font-semibold">Welcome to Pinterest</h1>
          <p>Find new ideas to try</p>
        </div>
        <div className=" flex flex-col p-2 mt-3 w-60">
          <label className="text-left">Email</label>
          <input
            className="p-2 mt-1 rounded-xl border-2 border-gray-500"
            type="text"
            placeholder="Email address"
          />
          <label className="text-left mt-2">Password</label>
          <input
            className="p-2 mt-1 rounded-xl border-2  border-gray-500"
            type="text"
            placeholder="Create password"
          />
          <button className="bg-red-600 p-2 font-bold mt-2 rounded-3xl text-white">
            Continue
          </button>
          <p className="m-1 font-semibold">OR</p>
          <button className="bg-blue-600 p-2 mt-2  font-bold rounded-3xl text-white">
            Continue with Facebook
          </button>
          <button className="p-2 font-semibold border-2 border-grey-700 rounded-3xl text-xs">
            Continue with Google
          </button>
          <p className=" text-xs tracking-tighter">
            By continuing, you agree to Pinterest&apos{" "}
            <span>Terms of Service</span> and acknowledge that you &apos ve read
            our <span>Privacy Policy </span> border-grey-300
            <span> Notice at collection </span>
          </p>
          <p className="">
            Already have an account? <span className="text-red-500">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
