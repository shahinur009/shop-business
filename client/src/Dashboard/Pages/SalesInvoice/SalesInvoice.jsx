import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import bg from '../../../../public/bg.png';

const SalesInvoice = () => {
    const [salesData, setSalesData] = useState(null);
    const [banglaWord, setBanglaWord] = useState('');
    const { id } = useParams();
    const invoiceRef = useRef();

    useEffect(() => {
        const allSalesData = async () => {
            const res = await axios.get(`http://localhost:5000/all-sales-data/${id}`);
            setSalesData(res.data);
            console.log(res.data);
        };
        allSalesData();
    }, [id]);

    // Dynamically import the bd_number package
    useEffect(() => {
        if (salesData?.totalAmount) {
            import('bd_number')
                .then((module) => {
                    const enToBnWord = module.enToBnWord;
                    const word = enToBnWord(salesData?.totalAmount);
                    setBanglaWord(word);
                })
                .catch((error) => {
                    console.error('Failed to load bd_number:', error);
                });
        }
    }, [salesData]);

    // Print Invoice here.....
    const printInvoice = () => {
        const printContents = invoiceRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <div ref={invoiceRef} className="p-2 relative z-10 flex flex-col justify-between">
                {/* div 1 */}
                <div className=''>
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-4">
                        <div>
                            <h1 className="text-2xl font-bold">বাবু ইলেকট্রনিক্স</h1>
                            <p className="text-xl mt-1">প্রোঃ মোঃ ইব্রাহিম হোসেন (বাবু)</p>
                            <p className="text-sm w-[75%] my-2">
                                এখানে এসি, ফ্রিজ, এলইডি টিভি, ফ্যান, রাইস কুকার, ম্যাজিক চুলা ও গ্যাস চুলা সহ অন্যান্য ইলেকট্রনিক্স পণ্য পাইকারী ও খুচরা বিক্রয় করা হয়।
                            </p>
                            <p className="font-semibold text-sm">
                                তিন রাস্তার পাশে, ভবানীপুর ডাঙ্গারহাট, বীরগঞ্জ, দিনাজপুর
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">মোবাইল:</span> ০১৩১৮০৯০৭৯৯, ০১৩০৩২৫১২৭৯
                            </p>
                        </div>

                        <div className="text-right">
                            <p>
                                <span className="font-semibold">ইনভয়েজ নাম্বার:</span> {id}
                            </p>
                            <p>
                                {/* <span className="font-semibold">তারিখ :</span> {salesData?.creationDate.split('T')[0]},{' '}
                            {salesData?.creationDate.split('T')[1].split('.')[0]} */}
                                12/12/2024
                            </p>
                        </div>
                    </div>
                    {/* Customer Info */}
                    <div className="mt-4 flex justify-between">
                        {salesData && (
                            <div>
                                <p>
                                    <strong>ক্রেতার নাম</strong>: {salesData.label}
                                </p>
                                <p>
                                    <strong>মোবাইল</strong>: {salesData.mobile}
                                </p>
                                <p>
                                    <strong>ঠিকানা</strong>: {salesData.address}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Invoice Table */}
                    <div className="mt-6">
                        <div className="invoice-background" style={{
                            backgroundImage: `url(${bg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.1,
                            position: 'absolute',
                            top: 20,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: -1
                        }}></div>
                        <table className="w-full table-auto border-collapse border border-gray-200">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">ক্রমিক নং</th>
                                    <th className="border border-gray-300 px-4 py-2">প্রোডাক্টের নাম</th>
                                    <th className="border border-gray-300 px-4 py-2">পরিমাণ</th>
                                    <th className="border border-gray-300 px-4 py-2">দাম</th>
                                    <th className="border border-gray-300 px-4 py-2">মোট টাকা</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData &&
                                    salesData.products.map((product, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{product?.product}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{product?.qty}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{product?.rate}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{parseInt(product?.qty) * parseInt(product?.rate)}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Total Section */}
                    {salesData && (
                        <div className="mt-6 flex justify-end p-[1px]">
                            <table className="w-auto table-auto border-collapse ">
                                <tbody>
                                    <tr className="border border-gray-500">
                                        <td className="text-right pr-4 px-2">
                                            <strong>টাকা:</strong>
                                        </td>
                                        <td className="text-right px-4 font-semibold">
                                            {salesData?.subtotal} <span className="font-extrabold"> ৳</span> </td>
                                    </tr>
                                    <tr className="border border-gray-500">
                                        <td className="text-right pr-4 px-2">
                                            <strong>কমিশন:</strong>
                                        </td>
                                        <td className="text-right px-4">{salesData?.discount}<span className="font-extrabold"> ৳</span> </td>
                                    </tr>
                                    <tr className="border border-gray-500">
                                        <td className="text-right pr-4 px-2">
                                            <strong>ভ্যাট:</strong>
                                        </td>
                                        <td className="text-right px-4">{salesData?.vat}<span className="font-extrabold"> %</span> </td>
                                    </tr>
                                    <tr className="border border-gray-500">
                                        <td className="text-right pr-4 px-2">
                                            <strong>লেবার/গাড়ি বিল:</strong>
                                        </td>
                                        <td className="text-right px-4">{salesData?.transport}<span className="font-extrabold"> ৳</span> </td>
                                    </tr>
                                    <tr className="border border-gray-500">
                                        <td className="text-right pr-4 px-2">
                                            <strong>জমার পরিমাণ:</strong>
                                        </td>
                                        <td className="text-right px-4">{salesData?.cashPaid}<span className="font-extrabold"> ৳</span> </td>
                                    </tr>
                                    <tr className="border border-gray-500">
                                        <td className="text-right pr-4  px-2">
                                            <strong>বাকী:</strong>
                                        </td>
                                        <td className="text-right px-4">{salesData?.due}<span className="font-extrabold"> ৳</span> </td>
                                    </tr>
                                    <tr className="border border-gray-500">
                                        <td className="text-right pr-4  px-2">
                                            <strong>মোট টাকা:</strong>
                                        </td>
                                        <td className="text-right px-4">{salesData?.totalAmount}<span className="font-extrabold"> ৳</span> </td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Footer */}
                    {/* Amount in Words */}
                    <div className="mt-10 font-semibold flex justify-between items-center">
                        <p>
                            কথায় :
                            <span className='text-sm'>
                                {banglaWord}
                                টাকা মাত্র ।
                            </span>
                        </p>


                        <p>সীল ও সিগনেচার </p>
                    </div>
                </div>

               
                {/* div 2 */}
                <div className="text-center items-baseline border-2 border-gray-800 bg-gray-200 mt-8">
                    <p className="font-semibold py-[2px]">
                        আপনাকে ধন্যবাদ । আবার আসবেন !
                    </p>
                </div>

            </div>
            {/* Print Button */}
            <div className="mt-4 text-center">
                <button
                    onClick={printInvoice}
                    className="btn btn-success"
                >
                    Print Invoice
                </button>
            </div>
        </div>
    );
};
export default SalesInvoice;