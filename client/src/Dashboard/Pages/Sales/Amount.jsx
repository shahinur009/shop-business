import { useEffect, useState } from "react";
import { useAuth } from "../../../provider/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Amount = () => {
    const { selectedCustomer, subtotalAmount, productsDetails, setInvoiceId, updateSelectedCustomerDue } = useAuth();
    const navigate = useNavigate();
    const [remining,setRemining] = useState()
    const [formData, setFormData] = useState({
        subtotal: 0,
        discount: 0,
        vat: 0,
        transport: 0,
        totalAmount: 0,
        cashPaid: 0,
        due: 0,
        totalDue: parseInt(selectedCustomer?.totalDue) || 0,
    });

    useEffect(() => {
        if (remining < 0) {
            setFormData((prevData) => ({
                ...prevData,
                cashPaid: 0 // Reset cashPaid if it causes negative remaining
            }));
            Swal.fire({
                title: 'Error!',
                text: `মোট বাকী টাকার বেশি দিতে পারবেন না। আপনি অতিরিক্ত দিয়েছেন ${remining} টাকা`,
                icon: 'error',
                timer: 10000
            });
        }
    }, [remining]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: parseFloat(value) || 0,
        }));
    };

    useEffect(() => {
        if (selectedCustomer) {
            setFormData((prevData) => ({
                ...prevData,
                totalDue: parseInt(selectedCustomer.totalDue) + prevData.due,
            }));
        }
    }, [selectedCustomer]);

    useEffect(() => {
        if (subtotalAmount) {
            setFormData((prevData) => ({
                ...prevData,
                subtotal: subtotalAmount,
            }));
        }
    }, [subtotalAmount]);

    useEffect(() => {
        const { subtotal, discount, vat, transport, cashPaid } = formData;
        const discountAmount = (subtotal * discount) / 100;
        const vatAmount = (subtotal * vat) / 100;
        const calculatedTotal = subtotal - discountAmount + vatAmount + transport;
        const dueAmount = calculatedTotal - cashPaid;

        setFormData((prevData) => ({
            ...prevData,
            totalAmount: calculatedTotal,
            due: dueAmount > 0 ? dueAmount : 0,
            totalDue: (dueAmount > 0 ? dueAmount : 0) + parseInt(selectedCustomer?.totalDue),
        }));
    }, [formData.subtotal, formData.discount, formData.vat, formData.transport, formData.cashPaid, selectedCustomer]);


    useEffect(()=>{
        const totalAmountWithPreviousDue = parseInt(formData.totalAmount) + parseInt(selectedCustomer?.totalDue);
        const remainAmount = totalAmountWithPreviousDue - parseInt(formData.cashPaid);
        setRemining(remainAmount)
    },[formData.cashPaid, formData.totalAmount, selectedCustomer?.totalDue])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.cashPaid <= 0) {
            Swal.fire({
                title: 'Error!',
                text: `জমা ছাড়া প্রোডাক্ট বিক্রি করা সম্ভব না`,
                icon: 'error',
                timer: 5000
            });
            return;
        }

        const id = selectedCustomer?.value;
        if (!id) {
            console.warn("Customer ID is missing or invalid.");
            return;
        }

        // const totalAmountWithPreviousDue = parseInt(formData.totalAmount) + parseInt(selectedCustomer?.totalDue);
        // const remainAmount = totalAmountWithPreviousDue - parseInt(formData.cashPaid);
        // setRemining(remainAmount)

        // upper code is here

        const { totalDue, ...customerData } = selectedCustomer;

        const currentTransactionData = {
            subtotal: formData.subtotal,
            discount: formData.discount,
            vat: formData.vat,
            transport: formData.transport,
            totalAmount: formData.totalAmount,
            cashPaid: formData.cashPaid,
            // totalDue: formData.totalDue,
            products: productsDetails,
            // before have remainAmount - if work not chabge:: [zahid-7:04pm]
            totaldue: parseInt(remining),
            customerId: id,
            ...customerData,
        };

        try {
            const salesResponse = await axios.post('http://localhost:5000/changeable', currentTransactionData);
            console.log("i found the data",salesResponse?.data?.insertedId);

            if (salesResponse) {
                const productId = salesResponse?.data?.insertedId;
                setInvoiceId(productId);

                Swal.fire({
                    title: "প্রিন্ট হবে!",
                    text: "ডকুমেন্ট প্রিন্টের জন্য প্রস্তুত ",
                    icon: "success"
                });

                navigate(`/dashboard/sales-print/${productId}`, { state: currentTransactionData });

            }
        } catch (salesError) {
            console.error("Error adding sales data:", salesError);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add sales data. Please check the server endpoint and data format.',
                icon: 'error',
                timer: 2500
            });
        }
    };

    return (
        <section>
            <div className="relative">
                <form onSubmit={handleSubmit}>
                    <div className="bg-red-200 border border-red-500 p-4 rounded text-sm">
                        <h2 className="font-bold mb-2">লেনদেন তথ্য </h2>

                        <div className="mb-1 flex items-center">
                            <label htmlFor="subtotal" className="mr-2 w-[20%]">সাময়িক টাকা</label>
                            <input
                                type="number"
                                id="subtotal"
                                name="subtotal"
                                readOnly
                                value={formData.subtotal}
                                className="border p-1 rounded w-[80%] outline-none bg-gray-500/30"
                            />
                        </div>

                        <div className="mb-1 flex items-center">
                            <label htmlFor="discount" className="mr-2 w-[20%]">কমিশন</label>
                            <div className="flex gap-2 w-[80%] items-center">
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    className="border p-1 rounded w-[90%]"
                                />
                                <span className="w-[10%]">%</span>
                            </div>
                        </div>

                        <div className="mb-1 flex items-center">
                            <label htmlFor="vat" className="mr-2 w-[20%]">ভ্যাট</label>
                            <div className="flex gap-2 w-[80%] items-center">
                                <input
                                    type="number"
                                    id="vat"
                                    name="vat"
                                    value={formData.vat}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    className="border p-1 rounded w-[90%]"
                                />
                                <span className="w-[10%]">%</span>
                            </div>
                        </div>

                        <div className="mb-1">
                            <label htmlFor="transport" className="mr-2">পরিবহন / লেবার খরচ</label>
                            <input
                                type="number"
                                id="transport"
                                name="transport"
                                value={formData.transport}
                                onChange={handleInputChange}
                                placeholder="0"
                                className="border p-1 rounded w-full"
                            />
                        </div>

                        <div className="mb-1">
                            <label htmlFor="totalAmount" className="mr-2">মোট টাকা</label>
                            <input
                                type="number"
                                id="totalAmount"
                                name="totalAmount"
                                readOnly={true}
                                value={formData.totalAmount}
                                placeholder="0"
                                className="border p-1 rounded w-full outline-none bg-gray-500/30"
                            />
                        </div>

                        <div className="mb-1">
                            <label htmlFor="cashPaid" className="mr-2">ক্যাশ জমা</label>
                            <input
                                type="number"
                                id="cashPaid"
                                name="cashPaid"
                                value={formData.cashPaid}
                                onChange={handleInputChange}
                                className="border p-1 rounded w-full"
                            />
                        </div>

                        <div className="mb-1 w-[60%]">
                            <label htmlFor="previousDue" className="mr-2">বাকী</label>
                            <input
                                type="number"
                                id="previousDue"
                                name="previousDue"
                                value={remining}
                                readOnly
                                className="border p-1 rounded w-full outline-none bg-black/50"
                            />
                        </div>

                        {/* <div className="mb-3 flex justify-between">
                            <button type="button" onClick={handleDueUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
                                Due Update
                            </button>
                            </div> */}

                        <button type="submit" className="bg-[#e94374f5] text-white font-semibold px-3 py-2 mt-2 rounded-md">বিক্রি নিশ্চিত করুন</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Amount;
