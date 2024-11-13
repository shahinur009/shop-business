import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../provider/useAuth";
import Swal from "sweetalert2";

const ProductsInfo = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { productsDetails, setProductsDetails } = useAuth();
    const [formData, setFormData] = useState({
        product: "",
        stock: 0,
        rate: 0,
        qty: 0,
    });

    const [products, setProducts] = useState([]);

    // Fetch products from MongoDB
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/product-info");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchProducts();
    }, []);

    // Handle react-select product change
    const handleProductChange = (selectedOption) => {
        setSelectedProduct(selectedOption);
        setFormData({
            ...formData,
            product: selectedOption.label,
            stock: selectedOption.productQty,
            rate: selectedOption.saleRate,
        });
    };

    // Update stock dynamically as qty changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const qty = name === "qty" ? parseInt(value) || 0 : formData.qty;

        // Check if quantity exceeds stock
        if (name === "qty" && qty > formData.stock) {
            alert(`স্টক থেকে বেশি বিক্রি সম্ভব না! স্টক আছে-${formData.stock}`);
            return setFormData((prevData) => ({
                ...prevData,
                qty: prevData.stock, // Reset qty to max available stock
            }));
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            stock: name === "qty" ? selectedProduct.productQty - qty : prevData.stock,
        }));
    };

    // Handle Add to Cart button click
    const handleAddToCart = async () => {
        if (formData.qty <= 0) {
            Swal.fire({
                title: 'Error!',
                text: `প্রোডাক্টের পরিমাণ দিন।`,
                icon: 'error',
                timer: 5000
            });
            return;
        }

        const newStock = formData.stock;

        setProductsDetails((prevDetails) => [
            ...prevDetails,
            { ...formData, total: formData.rate * formData.qty },
        ]);

        try {
            const id = selectedProduct?.value;
            await axios.put(`http://localhost:5000/product-info/${id}`, { newStock });
            console.log("Stock updated successfully");
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    // Convert product data to react-select format
    const productOptions = products.map((product) => ({
        value: product._id,
        label: product.productName,
        productQty: product.productQty,
        saleRate: product.saleRate,
    }));

    return (
        <div>
            <div className="bg-red-200 border border-red-500 p-1 mb-2 rounded text-sm">
                <h2 className="font-bold mb-2">প্রোডাক্টের তথ্য</h2>

                {/* Product Name Select */}
                <div className="mb-2 flex items-center justify-center">
                    <label htmlFor="product" className="mr-2 w-[20%]">
                        প্রোডাক্ট
                    </label>
                    <div className="w-[80%] flex justify-center gap-1">
                        <Select
                            id="product"
                            name="product"
                            options={productOptions}
                            value={selectedProduct}
                            onChange={handleProductChange}
                            placeholder="Select Product"
                            className="w-full"
                        />
                        <Link to="/dashboard/add-product" className="bg-[#e94374f5] text-white px-2 py-1">
                            +
                        </Link>
                    </div>
                </div>

                {/* Stock */}
                <div className="mb-2 flex items-center justify-center">
                    <label htmlFor="stock" className="mr-2 w-[20%]">
                        স্টক
                    </label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        className="border p-1 rounded w-[80%]"
                        readOnly
                    />
                </div>

                {/* Sale Rate */}
                <div className="mb-2 flex items-center justify-center">
                    <label htmlFor="rate" className="mr-2 w-[20%]">
                        বিক্রয় মূল্য
                    </label>
                    <input
                        type="number"
                        id="rate"
                        name="rate"
                        value={formData.rate}
                        onChange={handleInputChange}
                        placeholder="Rate"
                        className="border p-1 rounded w-[80%]"
                    />
                </div>

                {/* Quantity */}
                <div className="mb-2 flex items-center justify-center">
                    <label htmlFor="qty" className="mr-2 w-[20%]">
                        পরিমান
                    </label>
                    <input
                        type="number"
                        id="qty"
                        name="qty"
                        value={formData.qty}
                        onChange={handleInputChange}
                        placeholder="Quantity"
                        className="border p-1 rounded w-[80%]"
                    />
                </div>

                {/* Total */}
                <div className="mb-2 flex items-center justify-center">
                    <label htmlFor="total" className="mr-2 w-[20%]">
                        মোট টাকা
                    </label>
                    <input
                        type="number"
                        id="total"
                        name="total"
                        value={formData.rate * formData.qty}
                        onChange={handleInputChange}
                        placeholder="Total"
                        className="border p-1 rounded w-[80%] outline-none bg-gray-600/30"
                        readOnly
                    />
                </div>

                {/* Add to Cart Button */}
                <div className="flex justify-end">
                    <button onClick={handleAddToCart} className="bg-[#e94374f5] text-white font-semibold px-3 py-2 rounded-md">
                        কার্ডে যুক্ত করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsInfo;
