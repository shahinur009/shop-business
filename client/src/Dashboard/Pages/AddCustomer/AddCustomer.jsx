import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AddCustomerTableData from "./AddCustomerTableData";

export default function AddCustomer() {
    const [formCustomerData, setFormCustomerData] = useState({
        customerName: "",
        totalDue: null,
        fatherOrHusbandName: "",
        address: "",
        mobile: "",
        GranterName1: "",
        GranterName2: "",
        GranterNumber1: "",
        GranterNumber2: "",
        picture: "",
        granterPicture1: "",
        granterPicture2: "",
    });

    const imgbbAPIKey = "7a1340f98cb940d3df99fa653c6a6f69"; // Replace with your imgbb API key

    // Function to upload image to imgbb
    const uploadImageToImgbb = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, formData);
            return response.data.data.url; // Return the image URL
        } catch (error) {
            console.error("Error uploading image:", error);
            Swal.fire({
                icon: "error",
                title: "ছবি আপলোড করতে সমস্যা হচ্ছে",
                showConfirmButton: true,
            });
            return null;
        }
    };

    // Input field change handle function
    const handleInputChange = async (e) => {
        const { name, value, files } = e.target;

        // Image file upload for picture fields
        if (name === "picture" || name === "granterPicture1" || name === "granterPicture2") {
            const file = files[0];
            if (file) {
                const uploadedImageUrl = await uploadImageToImgbb(file);
                if (uploadedImageUrl) {
                    setFormCustomerData({ ...formCustomerData, [name]: uploadedImageUrl });
                }
            }
        } else if (name === "mobile" || name === "GranterNumber1" || name === "GranterNumber2") {
            const convertedValue = value.replace(/[০-৯]/g, (digit) => "০১২৩৪৫৬৭৮৯".indexOf(digit));
            setFormCustomerData({ ...formCustomerData, [name]: convertedValue });
        } else {
            setFormCustomerData({ ...formCustomerData, [name]: value });
        }
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalDue = parseInt(formCustomerData.totalDue)
        console.log(typeof finalDue)


        const { customerName, fatherOrHusbandName, address, mobile, GranterName1, GranterName2, GranterNumber1, GranterNumber2, picture, granterPicture1, granterPicture2, } = formCustomerData;

        // Validate required fields (excluding images)
        if (!customerName || !address || !mobile || !GranterName1 || !GranterName2 || !finalDue || !fatherOrHusbandName || !granterPicture1 || !granterPicture2 || !GranterName2 || !GranterNumber2 || !picture || !GranterNumber1) {
            Swal.fire({
                icon: "error",
                title: "সবগুলো ফিল্ড পূরণ করতে হবে",
                showConfirmButton: true,
            });
            return;
        }

        try {
            // Post the form data to the database
            const response = await axios.post("http://localhost:5000/add-customer", formCustomerData);
            const result = response.data;
            console.log("Customer added successfully:", result);

            Swal.fire({
                position: "top",
                icon: "success",
                title: "কাস্টমার সফলভাবে যোগ করা হয়েছে",
                showConfirmButton: false,
                timer: 1500,
            });

            // Reset the form after successful submission
            setFormCustomerData({
                customerName: "",
                // totalDue: null,
                finalDue: null,
                fatherOrHusbandName: "",
                address: "",
                mobile: "",
                GranterName1: "",
                GranterName2: "",
                GranterNumber1: "",
                GranterNumber2: "",
                picture: "",
                granterPicture1: "",
                granterPicture2: "",
            });
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `কিছু একটা সমস্যা হয়েছে: ${error.message}`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="w-full h-auto bg-slate-100 py-8">
            <h1 className="text-center text-lg md:text-3xl font-semibold mb-6 text-teal-700">
                কাস্টমার তথ্য প্রদান করুন
            </h1>

            {/* Form layout */}
            <div className="max-w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Customer Name */}
                        <div className="flex flex-col">
                            <label htmlFor="customerName" className="text-md">কাস্টমার নাম :</label>
                            <input
                                type="text"
                                name="customerName"
                                id="customerName"
                                value={formCustomerData.customerName}
                                onChange={handleInputChange}
                                placeholder="কাস্টমার নাম"
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>

                        {/* Father/Husband Name */}
                        <div className="flex flex-col">
                            <label htmlFor="fatherOrHusbandName" className="text-md">কাস্টমার পিতা/স্বামী নাম :</label>
                            <input
                                type="text"
                                name="fatherOrHusbandName"
                                id="fatherOrHusbandName"
                                value={formCustomerData.fatherOrHusbandName}
                                onChange={handleInputChange}
                                placeholder="পিতা/স্বামী নাম"
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col">
                            <label htmlFor="address" className="text-md">ঠিকানা :</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formCustomerData.address}
                                onChange={handleInputChange}
                                placeholder="ঠিকানা প্রদান করুন"
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>

                        {/* Mobile Number */}
                        <div className="flex flex-col">
                            <label htmlFor="mobile" className="text-md">মোবাইল নাম্বার :</label>
                            <input
                                type="text"
                                name="mobile"
                                id="mobile"
                                value={formCustomerData.mobile}
                                onChange={handleInputChange}
                                placeholder="মোবাইল নাম্বার"
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>
                        {/* Customer Picture */}
                        <div className="flex flex-col">
                            <label htmlFor="picture" className="text-md">কাস্টমার ছবি :</label>
                            <input
                                type="file"
                                name="picture"
                                id="picture"
                                onChange={handleInputChange}
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>

                        {/* Granter Name 1 */}
                        <div className="flex flex-col">
                            <label htmlFor="GranterName1" className="text-md">জামিনদারের নাম-১ :</label>
                            <input
                                type="text"
                                name="GranterName1"
                                id="GranterName1"
                                value={formCustomerData.GranterName1}
                                onChange={handleInputChange}
                                placeholder="জামিনদারের নাম-১"
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>

                        {/* Granter Number 1 */}
                        <div className="flex flex-col">
                            <label htmlFor="GranterNumber1" className="text-md">জামিনদারের মোবাইল-১ :</label>
                            <input
                                type="text"
                                name="GranterNumber1"
                                id="GranterNumber1"
                                value={formCustomerData.GranterNumber1}
                                onChange={handleInputChange}
                                placeholder="জামিনদারের মোবাইল-১"
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>
                        {/* Granter Picture 1 */}
                        <div className="flex flex-col">
                            <label htmlFor="granterPicture1" className="text-md">জামিনদারের ছবি-১ :</label>
                            <input
                                type="file"
                                name="granterPicture1"
                                id="granterPicture1"
                                onChange={handleInputChange}
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>

                        {/* Granter Name 2 */}
                        <div className="flex flex-col">
                            <label htmlFor="GranterName2" className="text-md">জামিনদারের নাম-২ :</label>
                            <input
                                type="text"
                                name="GranterName2"
                                id="GranterName2"
                                value={formCustomerData.GranterName2}
                                onChange={handleInputChange}
                                placeholder="জামিনদারের নাম-২"
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>

                        {/* Granter Number 2 */}
                        <div className="flex flex-col">
                            <label htmlFor="GranterNumber2" className="text-md">জামিনদারের মোবাইল-২ :</label>
                            <input
                                type="text"
                                name="GranterNumber2"
                                id="GranterNumber2"
                                value={formCustomerData.GranterNumber2}
                                onChange={handleInputChange}
                                placeholder="জামিনদারের মোবাইল-২"
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>
                        {/* Granter Picture 2 */}
                        <div className="flex flex-col">
                            <label htmlFor="granterPicture2" className="text-md">জামিনদারের ছবি-২ :</label>
                            <input
                                type="file"
                                name="granterPicture2"
                                id="granterPicture2"
                                onChange={handleInputChange}
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>
                        {/* Granter Picture 2 */}
                        <div className="flex flex-col">
                            <label htmlFor="granterPicture2" className="text-md">বকেয়া
                            </label>
                            <input
                                type="number"
                                name="totalDue"
                                id="totalDue"
                                onChange={handleInputChange}
                                className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                            />
                        </div>
                    </div>

                    <div className="col-span-3 flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-teal-600 text-white font-semibold py-2 px-6 rounded hover:bg-teal-700 transition"
                        >
                            যোগ করুন
                        </button>
                    </div>
                </form>
            </div>

            {/* Customer Table Data */}
            <div>
                <AddCustomerTableData />
            </div>
        </div>
    );
}
