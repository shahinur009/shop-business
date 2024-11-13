import axios from "axios";
import { useEffect, useState } from "react";

export default function AllSalesReport() {
    const [sales, setSales] = useState([]);
    const [selectedSale, setSelectedSale] = useState(null); // To store selected sale for details
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    // Fetch sales data from MongoDB
    const fetchSales = async () => {
        try {
            const response = await axios.get("http://localhost:5000/sales-report");
            setSales(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    // Filter sales based on search term
    const filteredSales = sales.filter((sale) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            sale.customerData.label.toLowerCase().includes(searchTermLower) || // Customer name
            sale.customerData.address.toLowerCase().includes(searchTermLower) || // Address
            sale.customerData.mobile.toLowerCase().includes(searchTermLower) || // Mobile
            sale.due.toString().includes(searchTermLower) // Due amount
        );
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4 text-[#dc4b76f5]">সকল বিক্রয় রিপোর্ট</h1>

            {/* Search Input */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="আপনার যা দরকার তাই সার্চ করুন ..."
                className="block p-2 mb-4 rounded outline-none sm:text-sm w-full border border-gray-300"
            />

            <table className="min-w-full border-collapse text-sm ">
                <thead>
                    <tr className="bg-[#dc4b76f5] text-white">
                        <th className="p-2">কাস্টমার নাম</th>
                        <th className="p-2">ঠিকানা</th>
                        <th className="p-2">মোবাইল</th>
                        <th className="p-2">বাকি</th>
                        <th className="p-2">দেখুন</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map((sale) => (
                        <tr key={sale._id} className="border-b">
                            <td className="py-2 px-4 text-center border border-gray-300">{sale?.customerData?.label}</td>
                            <td className="py-2 px-4 text-center border border-gray-300">{sale?.customerData?.address}</td>
                            <td className="py-2 px-4 text-center border border-gray-300">{sale?.customerData?.mobile}</td>
                            <td className="py-2 px-4 text-center border border-gray-300">{sale?.due}</td>
                            <td className="py-2 px-4 text-center border border-gray-300">
                                <button
                                    onClick={() => setSelectedSale(sale)}
                                    className="bg-[#e94374f5] text-white font-semibold px-3 py-2 rounded-md"
                                >
                                    সব দেখুন 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Details Modal */}
            {selectedSale && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded w-1/2">
                        <h2 className="text-xl mb-2 text-[#dc4b76f5] font-bold">বিক্রির সকল তথ্য </h2>
                        <p><strong className="text-sm">কাস্টমারের নাম :</strong> {selectedSale.customerData.label}</p>
                        <p><strong className="text-sm">কাস্টমারের মোবাইল:</strong> {selectedSale.customerData.mobile}</p>
                        <p><strong className="text-sm">কাস্টমারের ঠিকানা:</strong> {selectedSale.customerData.address}</p>
                        <p><strong className="text-sm">শুধু পণ্যের দাম :</strong> {selectedSale?.subtotal}</p>
                        <p><strong className="text-sm">কমিশন :</strong> {selectedSale?.discount}</p>
                        <p><strong className="text-sm">ভ্যাট :</strong> {selectedSale?.vat}</p>
                        <p><strong className="text-sm">পরিবহন / লেবার খরচ :</strong> {selectedSale?.transport}</p>
                        <p><strong className="text-sm">মোট টাকা :</strong> {selectedSale?.totalAmount}</p>
                        <p><strong className="text-sm">জমার পরিমাণ :</strong> {selectedSale?.cashPaid}</p>
                        <p><strong className="text-sm">বাকি :</strong> {selectedSale?.due}</p>

                        <h3 className="text-lg mt-4 ">প্রোডাক্টের তথ্য :</h3>
                        <ul>
                            {selectedSale.products.map((product, index) => (
                                <li key={index}>
                                    প্রোডাক্ট নাম : {product?.product}
                                    <br />
                                    পরিমাণ: {product?.qty},
                                    <br />
                                    দাম: {product?.rate},
                                    <br />
                                    মোট: {product?.total}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => setSelectedSale(null)}
                            className="bg-[#e94374f5] text-white font-semibold px-3 py-2 mt-2 rounded-md"
                        >
                            বন্ধ করুন 
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
