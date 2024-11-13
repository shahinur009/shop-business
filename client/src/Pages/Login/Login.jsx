import Swal from 'sweetalert2';
import image from '../../../public/Login Register Image/image.jpg';
import { AuthContext } from '../../provider/AuthProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const Login = () => {
    const { signIn, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    // const from = location.state?.from?.pathname || "/";

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // navigate(from, { replace: true });

        try {
            await signIn(email, password)
            // navigate(from, { replace: true });
            navigate('/dashboard')
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Log In Successfully",
                showConfirmButton: false,
                timer: 1500
            });

        } catch (err) {
            console.log(err)
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Log In error",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div className="hero h-[87vh] bg-cover bg-[#004A29] py-[21px]">
            <div className="hero-content flex flex-col lg:flex-row justify-center items-center">
                <img
                    src={image}
                    alt="Login Illustration"
                    className="max-w-md rounded-lg shadow-lg md:h-[415px] h-full"
                />
                <div className="w-full max-w-md p-8 bg-[#006D68] opacity-90 rounded-lg shadow-lg md:h-[415px] h-full">
                    <h1 className="text-4xl font-bold text-center text-white mb-6">Sign in</h1>
                    <form onSubmit={handleLogin} noValidate className="space-y-6 ">
                        <div className="flex flex-col space-y-3">
                            <label htmlFor="email" className="text-white text-sm">User Name</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="User email....."
                                name='email'
                                className="rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-[#F4CE1F] transition w-[275px]"
                            />
                            <label htmlFor="password" className="text-white text-sm">Password</label>
                            <input
                                id="password"
                                type="password" // Changed to "password" for security
                                placeholder="Password....."
                                name='password'
                                className="rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-[#F4CE1F] transition"
                            />
                        </div>
                        <button
                            disabled={loading}
                            className="block w-full px-1 rounded-md py-3 bg-[#F4CE1F]">
                            {loading ? <FaSpinner className="animate-spin text-xl text-white mx-auto" /> : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
