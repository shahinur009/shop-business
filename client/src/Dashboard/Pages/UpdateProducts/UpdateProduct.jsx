/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateProduct() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productCode: "",
        productName: "",
        productQty: "",
        productCategory: "",
        buyRate: "",
        saleRate: "",
        wholeSales: "",
        productImage: null,
    });

    const fileInputRef = useRef(null); // Reference for resetting file input

    // Fetch existing product data
    useEffect(() => {
        async function fetchProductData() {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                const product = response.data;
                setFormData({
                    productCode: product.productCode,
                    productName: product.productName,
                    productQty: product.productQty,
                    productCategory: product.productCategory,
                    buyRate: product.buyRate,
                    saleRate: product.saleRate,
                    wholeSales: product.wholeSales,
                    productImage: null, // Reset image field
                });
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        }

        fetchProductData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, productImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If an image is selected, upload it to imgbb
        let imageUrl = null;
        if (formData.productImage) {
            try {
                const imgbbAPIKey = "7a1340f98cb940d3df99fa653c6a6f69";
                const imageFormData = new FormData();
                imageFormData.append("image", formData.productImage);

                const imgbbResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
                    imageFormData
                );
                imageUrl = imgbbResponse.data.data.url;
            } catch (error) {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `Image upload failed: ${error.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                return; // Stop execution if image upload fails
            }
        }

        // Prepare product data with or without image URL
        const updatedProductData = {
            ...formData,
            productImage: imageUrl ? imageUrl : undefined, // Only include image URL if a new image is uploaded
        };

        try {
            const response = await axios.put(`http://localhost:5000/products/${id}`, updatedProductData);
            console.log(response)
            navigate('/dashboard/add-product')
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Product updated successfully",
                showConfirmButton: false,
                timer: 1500,
            });

            // Optionally, reset the form or navigate to another page

            // Reset the image file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: `Update failed: ${error.message}`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="w-full h-auto bg-slate-100 py-8">
            <h1 className="text-center text-lg md:text-3xl font-semibold mb-6 text-teal-700">
                প্রোডাক্ট আপডেট করুন
            </h1>

            {/* Form Layout */}
            <div className="max-w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Product Code */}
                    <div className="flex flex-col">
                        <label htmlFor="productCode" className="text-md ">
                            প্রোডাক্ট কোড :
                        </label>
                        <input
                            type="text"
                            name="productCode"
                            id="productCode"
                            value={formData.productCode}
                            onChange={handleInputChange}
                            placeholder="প্রোডাক্ট কোড"
                            className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                        />
                    </div>

                    {/* Product Name */}
                    <div className="flex flex-col">
                        <label htmlFor="productName" className="text-md ">
                            প্রোডাক্ট নাম :
                        </label>
                        <input
                            type="text"
                            name="productName"
                            id="productName"
                            value={formData.productName}
                            onChange={handleInputChange}
                            placeholder="প্রোডাক্ট নাম প্রদান করুন"
                            className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                        />
                    </div>

                    {/* Product Qty */}
                    <div className="flex flex-col">
                        <label htmlFor="productQty" className="text-md ">
                            প্রোডাক্ট পিছ :
                        </label>
                        <input
                            type="text"
                            name="productQty"
                            id="productQty"
                            value={formData.productQty}
                            onChange={handleInputChange}
                            placeholder="প্রোডাক্ট পিছ প্রদান করুন"
                            className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                        />
                    </div>

                    {/* Product Category */}
                    <div className="flex flex-col">
                        <label htmlFor="productCategory" className="text-md ">
                            প্রোডাক্ট শ্রেণী :
                        </label>
                        <input
                            type="text"
                            name="productCategory"
                            id="productCategory"
                            value={formData.productCategory}
                            onChange={handleInputChange}
                            placeholder="প্রোডাক্ট শ্রেণী প্রদান করুন"
                            className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                        />
                    </div>

                    {/* Buy Rate */}
                    <div className="flex flex-col">
                        <label htmlFor="buyRate" className="text-md">
                            ক্রয় রেট :
                        </label>
                        <input
                            type="number"
                            name="buyRate"
                            id="buyRate"
                            value={formData.buyRate}
                            onChange={handleInputChange}
                            placeholder="ক্রয় রেট প্রদান করুন"
                            className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                        />
                    </div>

                    {/* Sale Rate */}
                    <div className="flex flex-col">
                        <label htmlFor="saleRate" className="text-md ">
                            খুচরা বিক্রয় রেট :
                        </label>
                        <input
                            type="number"
                            name="saleRate"
                            id="saleRate"
                            value={formData.saleRate}
                            onChange={handleInputChange}
                            placeholder="খুচরা বিক্রয় রেট প্রদান করুন"
                            className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                        />
                    </div>

                    {/* Wholesale Rate */}
                    <div className="flex flex-col">
                        <label htmlFor="wholeSales" className="text-md ">
                            পাইকারি বিক্রয় রেট :
                        </label>
                        <input
                            type="number"
                            name="wholeSales"
                            id="wholeSales"
                            value={formData.wholeSales}
                            onChange={handleInputChange}
                            placeholder="পাইকারি বিক্রয় রেট প্রদান করুন"
                            className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                        />
                    </div>

                    {/* Product Image */}
                    <div className="flex flex-col">
                        <label htmlFor="productImage" className="text-md ">
                            প্রোডাক্ট ছবি :
                        </label>
                        <input
                            type="file"
                            name="productImage"
                            id="productImage"
                            onChange={handleImageChange}
                            ref={fileInputRef} // Reset the input after submission
                            className="py-2 px-3 block outline-none rounded-sm border border-teal-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-3 flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-teal-600 text-white font-semibold py-2 px-6 rounded hover:bg-teal-700 transition"
                        >
                            আপডেট করুন
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
