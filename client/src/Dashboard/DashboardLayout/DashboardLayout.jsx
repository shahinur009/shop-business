import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/useAuth";

const DashboardLayout = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logOut()
        navigate('/')
    }

    return (
        <div className="flex">
            <div className="w-[15%] bg-[#dc4b76f5] min-h-screen ">
                <ul className="space-y-4 items-center p-2 text-white">
                    <li><Link to='/dashboard'>Home</Link></li>
                    <li><Link to='sales'>বিক্রয় এন্ট্রি</Link></li>
                    <li><Link to='add-product'>পণ্য যোগ করুন</Link></li>
                    <li><Link to="products-list">সকল পণ্য</Link></li>
                    <li><Link to='all-sales-report'>সকল বিক্রয় রিপোর্ট</Link></li>
                    <li><Link to='customer-info'>গ্রাহক রিপোর্ট</Link></li>
                    <li><Link to='products-buy'>Products Buy</Link></li>
                    <li><Link to='purchase-report'>ক্রয় পন্যের রিপোর্ট</Link></li>
                    <li><button className="px-8 py-1 mt-10 bg-[#8d56668e] border" onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
            <div className="w-[85%] pr-4">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;