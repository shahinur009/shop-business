import { useState, useRef } from "react";
import TableData from "./TableData/TableData";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddProducts() {
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

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;

      // Upload image to imgbb only if an image is provided
      if (formData.productImage) {
        const imgbbAPIKey = '7a1340f98cb940d3df99fa653c6a6f69'; // Replace with your imgbb API key
        const imageFormData = new FormData();
        imageFormData.append("image", formData.productImage);

        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
          imageFormData
        );
        imageUrl = imgbbResponse.data.data.url;
      }

      // Prepare the final product data, using the image URL if available
      const productData = {
        ...formData,
        productImage: imageUrl, // Use the imgbb image URL or leave as null
      };

      // Send product data to your server
      const response = await axios.post("http://localhost:5000/add-product", productData);
      const result = response.data;
      console.log("Product added successfully:", result);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product added successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset the form after successful submission
      setFormData({
        productCode: "",
        productName: "",
        productQty: "",
        productCategory: "",
        buyRate: "",
        saleRate: "",
        wholeSales: "",
        productImage: null,
      });

      // Clear the file input field using ref
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }

    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Something went wrong: ${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="w-full h-auto bg-red-200 py-8">
      <h1 className="text-center text-lg md:text-3xl font-semibold mb-6 text-[#e94374f5]">
        প্রোডাক্ট যোগ করুন
      </h1>

      {/* Form Layout */}
      <div className="max-w-full mx-auto p-6 rounded-lg ">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          {/* Product Code */}
          <div className="flex flex-col">
            <label htmlFor="productCode" className="text-sm font-medium mb-1">
              প্রোডাক্ট কোড :
            </label>
            <input
              type="text"
              name="productCode"
              id="productCode"
              value={formData.productCode}
              onChange={handleInputChange}
              placeholder="প্রোডাক্ট কোড"
              className="py-1.5 px-2 text-sm outline-none rounded border border-teal-400 focus:border-teal-600 transition"
            />
          </div>

          {/* Product Name */}
          <div className="flex flex-col">
            <label htmlFor="productName" className="text-sm font-medium mb-1">
              প্রোডাক্ট নাম :
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="প্রোডাক্ট নাম প্রদান করুন"
              className="py-1.5 px-2 text-sm outline-none rounded border border-teal-400 focus:border-teal-600 transition"
            />
          </div>

          {/* Product Qty */}
          <div className="flex flex-col">
            <label htmlFor="productQty" className="text-sm font-medium mb-1">
              প্রোডাক্ট স্টক :
            </label>
            <input
              type="text"
              name="productQty"
              id="productQty"
              value={formData.productQty}
              onChange={handleInputChange}
              placeholder="প্রোডাক্ট পিছ প্রদান করুন"
              className="py-1.5 px-2 text-sm outline-none rounded border border-teal-400 focus:border-teal-600 transition"
            />
          </div>

          {/* Product Category */}
          <div className="flex flex-col">
            <label htmlFor="productCategory" className="text-sm font-medium mb-1">
              প্রোডাক্ট শ্রেণী :
            </label>
            <input
              type="text"
              name="productCategory"
              id="productCategory"
              value={formData.productCategory}
              onChange={handleInputChange}
              placeholder="প্রোডাক্ট শ্রেণী প্রদান করুন"
              className="py-1.5 px-2 text-sm outline-none rounded border border-teal-400 focus:border-teal-600 transition"
            />
          </div>

          {/* Buy Rate */}
          <div className="flex flex-col">
            <label htmlFor="buyRate" className="text-sm font-medium mb-1">
              ক্রয় রেট :
            </label>
            <input
              type="number"
              name="buyRate"
              value={formData.buyRate}
              onChange={handleInputChange}
              placeholder="ক্রয় রেট প্রদান করুন"
              className="py-1.5 px-2 text-sm outline-none rounded border border-teal-400 focus:border-teal-600 transition"
            />
          </div>

          {/* Sale Rate */}
          <div className="flex flex-col">
            <label htmlFor="saleRate" className="text-sm font-medium mb-1">
              খুচরা বিক্রয় রেট :
            </label>
            <input
              type="number"
              name="saleRate"
              id="saleRate"
              value={formData.saleRate}
              onChange={handleInputChange}
              placeholder="খুচরা বিক্রয় রেট প্রদান করুন"
              className="py-1.5 px-2 text-sm outline-none rounded border border-teal-400 focus:border-teal-600 transition"
            />
          </div>

          {/* Wholesale Rate */}
          <div className="flex flex-col">
            <label htmlFor="wholeSales" className="text-sm font-medium mb-1">
              পাইকারি বিক্রয় রেট :
            </label>
            <input
              type="number"
              name="wholeSales"
              id="wholeSales"
              value={formData.wholeSales}
              onChange={handleInputChange}
              placeholder="পাইকারি বিক্রয় রেট প্রদান করুন"
              className="py-1.5 px-2 text-sm outline-none rounded border border-teal-400 focus:border-teal-600 transition"
            />
          </div>

          {/* Product Image */}
          <div className="flex flex-col">
            <label htmlFor="productImage" className="text-sm font-medium mb-1">
              প্রোডাক্ট ছবি :
            </label>
            <input
              type="file"
              name="productImage"
              id="productImage"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="py-1.5 px-2 text-sm outline-none rounded border border-teal-400 focus:border-teal-600 transition"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-3 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#e94374f5] text-white font-semibold px-3 py-2 rounded-md"
            >
              যোগ করুন
            </button>
          </div>
        </form>
      </div>

      {/* Table Layout */}
      <div>
        <TableData />
      </div>
    </div>

  );
}
