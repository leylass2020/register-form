import { FaUser } from 'react-icons/fa';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import { useState } from "react";

const schema =z.object({
   name:z.string().min(3,"name must be at least 3 characters").max(250),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(50),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type FormFields = z.infer<typeof schema>;

const Register = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const[color,setColor] = useState('#ff6467');
  const {
    register , 
    handleSubmit, 
    reset,
    setError,
    formState:{errors,isSubmitting}
  } = useForm<FormFields>({
    resolver:zodResolver(schema),
  });
  const onSubmit = async(data:FormFields)=>{
    try {
      // simulating when fetching data wait until response
      await new Promise((resolve)=> setTimeout(resolve,1000));
      console.log(data);

      // Here for fetching real data  
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Submission failed');

      setShowSuccess(true);
      setColor("#05df72");
      setTimeout(() => {
        reset();
        setShowSuccess(false);
        setColor('#ff6467');
      }, 5000);
      
    } catch (error) {
      setError("root",{
        message:`Server Error , ${error}`,
      }); 
    }  
  }

  const styleField ="w-full px-3 p-0 m-0 text-gray-600 text-sm sm:text-lg h-11 sm:h-13 border-2 rounded-2xl border-gray-400 focus:border-red-400 focus:outline-none";
  
  return (
    <div className="h-full flex flex-col justify-center items-center max-w-xl w-full mx-auto my-3">
      <h2 className="text-4xl m-5 font-bold" style={{color:color}}>
        Regester Form
      </h2>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        action="" 
        className="w-full gap-2 flex flex-col p-5 pb-6 pt-3 m-5 bg-white shadow-2xl rounded-4xl ">
          
          <FaUser size={40} color={color}  className='w-full m-auto'/>
          {showSuccess && 
          <p className='bg-green-100 p-1 text-lg w-full font-bold text-center' style={{color:color}}>
             you have registered successfully
          </p>}
          
          <input 
            {...register("name")}
            type="text" 
            name="name" 
            placeholder="John"
            id="name" 
            className={styleField} />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}

          <input 
            {...register("email")}
            type="email" 
            name="email" 
            placeholder="example@email.com"
            id="email" 
            className={styleField} />
          {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}

          <input 
            {...register("password")}
            type="password" 
            placeholder="password"
            name="password" 
            id="password" 
            className={styleField} />
          {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}

          <input 
            {...register("confirmPassword")}
            type="password" 
            name="confirmPassword" 
            placeholder="confirmpassword"
            id="confirm" 
            className={styleField} />
          {errors.confirmPassword && <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>}
  
          <button 
            disabled={isSubmitting}
            type='submit' 
            className="w-full text-white text-xl font-bold h-13 rounded-2xl hover:cursor-pointer mt-4 bg-gray-500 hover:bg-red-400 "  >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        <button
          disabled={isSubmitting} 
          type="button"
          onClick={() => reset()}
          className="w-full text-gray-600 text-xl font-bold h-13 rounded-2xl border-2 border-gray-600 hover:cursor-pointer hover:bg-red-400 hover:border-none hover:text-white "
          >
          Clear Form
        </button>

        {errors.root && <span className='text-red-500 text-sm'>{errors.root.message}</span>}

      </form>  
    </div>
  )
}

export default Register