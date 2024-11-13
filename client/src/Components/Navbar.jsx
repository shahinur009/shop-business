import logo from '../../public/logo.png';

const Navbar = () => {
    return (
        <>
            <header className="p-4 bg-[#006A62]">
                <div className="container flex justify-between h-16 mx-auto items-center">
                    <div className="flex items-center">
                        <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                            <img src={logo} alt="website logo" />
                        </a>
                    </div>

                    {/* Center the nav links */}
                    <div className="flex justify-center w-full">
                        <ul className="items-center space-x-3 lg:flex lg:justify-center lg:items-center font-semibold text-white">
                            <li className="flex">
                                <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1">Home</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1">Features</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        <button className="px-8 py-3 bg-[#DCC120] font-semibold rounded">Admin Help</button>
                    </div>

                    <button className="p-4 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>
        </>
    );
};

export default Navbar;
