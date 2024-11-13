import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdEdit, MdDelete } from "react-icons/md"; // Import icons

export default function TableData() {
  const [products, setProducts] = useState([]);

  // Function to fetch data from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to delete a product
  const deleteProduct = async (id) => {
    try {
      Swal.fire({
        title: "ডিলেট করতে চান?",
        text: "ডিলেট হয়ে যাবে প্রোডাক্ট",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:5000/products/${id}`);
          setProducts(products.filter((product) => product._id !== id));
          Swal.fire("Deleted!", "ডিলেট সফল হয়েছে", "success");
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
      <div className="max-w-full mx-auto p-4 rounded-lg ">
        <table className="table-auto w-full border-collapse border border-red-400 text-sm">
          <thead>
            <tr className="bg-[#e94374f5] text-white text-xs font-semibold">
              <th className="p-2">ক্রমিক নং</th>
              <th className="p-2">প্রোডাক্ট কোড</th>
              <th className="p-2">প্রোডাক্ট নাম</th>
              <th className="p-2">প্রোডাক্টের শ্রেণী</th>
              <th className="p-2">স্টকের পরিমান</th>
              <th className="p-2">ক্রয় মূল্য</th>
              <th className="p-2">খুচরা বিক্রয় মূল্য</th>
              <th className="p-2">পাইকারি বিক্রয় মূল্য</th>
              <th className="p-2">প্রক্রিয়া</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="text-center">
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">{product.productCode}</td>
                <td className="border px-2 py-1">{product.productName}</td>
                <td className="border px-2 py-1">{product.productCategory}</td>
                <td className="border px-2 py-1">{product.productQty}</td>
                <td className="border px-2 py-1">{product.buyRate}</td>
                <td className="border px-2 py-1">{product.saleRate}</td>
                <td className="border px-2 py-1">{product.wholeSales}</td>
                <td className="border px-2 py-1">
                  <div className="flex justify-center gap-2">
                    <Link to={`/update-product/${product._id}`}>
                      <MdEdit className="text-green-500 hover:text-green-700 cursor-pointer" />
                    </Link>
                    <MdDelete
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => deleteProduct(product._id)}
                    />
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
