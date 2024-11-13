import axios from "axios";
import { useState, useEffect } from "react";

const ProductsList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // New state for search term

    // Fetch categories from the backend
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/products-report");
            const allProducts = response.data;

            const distinctCategories = [
                ...new Set(allProducts.map(product => product.productCategory))
            ];

            setCategories(distinctCategories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Fetch products from the backend
    const fetchProducts = async (category) => {
        try {
            const response = await axios.get("http://localhost:5000/products-report", {
                params: { category }
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts(selectedCategory);
    }, [selectedCategory]);

    // Filter products based on the search term
    const filteredProducts = products.filter(product => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            product.productName.toLowerCase().includes(searchTermLower) ||
            product.productCode.toLowerCase().includes(searchTermLower) ||
            product.productCategory.toLowerCase().includes(searchTermLower) ||
            product.buyRate.toString().includes(searchTermLower) || // Include buy rate
            product.saleRate.toString().includes(searchTermLower) || // Include sale rate
            product.wholeSales.toString().includes(searchTermLower)   // Include whole sales
        );
    });

    return (
        <section>
            <div className="flex space-x-4 items-center p-4 my-5 bg-red-200 relative">
                <p className="text-lg">সব প্রোডাক্ট দেখুন </p>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block w-48 p-2 rounded outline-none sm:text-sm bg-[#dc4b76f5] text-white"
                >
                    <option value="">-- সব প্রোডাক্ট --</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Search input */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="সার্চ করুন ..."
                    className="block p-2 rounded outline-none sm:text-sm w-48 bg-white border border-gray-300"
                />
            </div>

            {/* Display products in a table */}
            <div>
                <table className="min-w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-[#e94374f5] text-white font-normal">
                            <th className="p-2">প্রোডাক্ট কোড</th>
                            <th className="p-2">প্রোডাক্ট নাম</th>
                            <th className="p-2">প্রোডাক্টের শ্রেণী</th>
                            <th className="p-2">ক্রয় দাম</th>
                            <th className="p-2">খুচরা বিক্রয় দাম</th>
                            <th className="p-2">পাইকারি বিক্রয় দাম</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product._id} className="border-b">
                                    <td className="py-2 px-4 text-center border border-gray-300">
                                        {product.productCode}
                                    </td>
                                    <td className="py-2 px-4 text-center border border-gray-300">
                                        {product.productName}
                                    </td>
                                    <td className="py-2 px-4 text-center border border-gray-300">
                                        {product.productCategory}
                                    </td>
                                    <td className="py-2 px-4 text-center border border-gray-300">
                                        {product.buyRate}
                                    </td>
                                    <td className="py-2 px-4 text-center border border-gray-300">
                                        {product.saleRate}
                                    </td>
                                    <td className="py-2 px-4 text-center border border-gray-300">
                                        {product.wholeSales}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-2 px-4 text-center border border-gray-300">
                                    কোন প্রোডাক্ট পাওয়া যায়নি।
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ProductsList;
