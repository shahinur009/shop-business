import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddCustomerTableData() {
    const [customers, setCustomers] = useState([]);

    // Function to fetch data from the backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/customers");
            setCustomers(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Function to delete a product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/customers/${id}`);
            // Remove the deleted product from the state
            setCustomers(customers.filter((customer) => customer._id !== id));
            Swal.fire({
                title: "ডিলেট করতে চান?",
                text: "ডিলেট হয়ে যাবে? ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "ডিলেট সফল হয়েছে ",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Initial fetch    
        const interval = setInterval(fetchProducts, 5000); // Poll every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div>
            <div className="max-w-full mx-auto p-4 bg-white rounded-lg">
                <table className="table-auto w-full border-collapse border border-teal-400">
                    <thead>
                        <tr className="bg-teal-600 text-white text-sm">
                            <th className="p-1">ক্রমিক নং </th>
                            <th className="p-1">কাস্টমার নাম </th>
                            <th className="p-1">ঠিকানা</th>
                            <th className="p-1">মোবাইল নাম্বার</th>
                            <th className="p-1">আগের বকেয়া </th>
                            <th className="p-1"> তারিখ </th>
                            <th className="p-1"> প্রক্রিয়া </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer._id} className="text-center text-sm">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{customer.customerName}</td>
                                <td className="border px-4 py-2">{customer.address}</td>
                                <td className="border px-4 py-2">{customer.mobile}</td>
                                <td className="border px-4 py-2">{customer.totalDue}</td>
                                <td className="border px-4 py-2">
                                    {/* Formatting the date */}
                                    {new Date(customer.creationDate).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    })}
                                </td>
                                <td className="border px-4 py-2 text-sm">
                                    <div>
                                        <button
                                            className="bg-red-500 text-white w-[134px] p-1 rounded mt-2"
                                            onClick={() => deleteProduct(customer._id)}
                                        >
                                            মুছে ফেলুন
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
