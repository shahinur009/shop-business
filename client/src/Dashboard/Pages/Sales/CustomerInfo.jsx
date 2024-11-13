import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select"; // Import react-select
import axios from "axios"; // Import axios to fetch data from MongoDB
import { useAuth } from "../../../provider/useAuth";

const CustomerInfo = () => {
    const { selectedCustomer, setSelectedCustomer } = useAuth()
    const [formData, setFormData] = useState({
        name: "",
        totalDue: "",
        address: "",
        fatherOrHusbandName: "",
        mobile: "",
        GranterName1: "",
        GranterName2: "",
        GranterNumber1: "",
        GranterNumber2: "",
        picture: "",
        granterPicture1: "",
        granterPicture2: "",
    });

    const [customers, setCustomers] = useState([]);

    // Fetch customers from MongoDB
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/customers"); // Replace with your API route
                setCustomers(response.data); // Assuming the data is an array of customer objects
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };
        fetchCustomers();
    }, []);

    // Handle react-select customer change
    const handleCustomerChange = (selectedOption) => {
        setSelectedCustomer(selectedOption); // Set selected customer
        setFormData({
            ...formData,
            name: selectedOption.label,
            mobile: selectedOption.mobile,
            address: selectedOption.address,
            totalDue: selectedOption.totalDue,
            fatherOrHusbandName: selectedOption.fatherOrHusbandName,
            GranterName1: selectedOption.GranterName1,
            GranterName2: selectedOption.GranterName2,
            GranterNumber1: selectedOption.GranterNumber1,
            GranterNumber2: selectedOption.GranterNumber2,
            picture: selectedOption.picture,
            granterPicture1: selectedOption.granterPicture1,
            granterPicture2: selectedOption.granterPicture2,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Convert customer data to react-select format
    const customerOptions = customers.map((customer) => ({
        value: customer._id,
        label: customer.customerName,
        mobile: customer.mobile,
        address: customer.address,
        fatherOrHusbandName: customer.fatherOrHusbandName,
        totalDue: customer.totalDue,
        GranterName1: customer.GranterName1,
        GranterName2: customer.GranterName2,
        GranterNumber1: customer.GranterNumber1,
        GranterNumber2: customer.GranterNumber2,
        picture: customer.picture,
        granterPicture1: customer.granterPicture1,
        granterPicture2: customer.granterPicture2,
    }));

    return (
        <div>
            <div className="bg-red-200 border border-red-500 p-2 rounded text-sm h-[270px]">
                <h2 className="font-bold mb-2">ক্রেতার তথ্য</h2>

                {/* Customer Select */}
                <div className="mb-2 flex items-center justify-center gap-2">
                    <label htmlFor="customer" className="mr-2 w-[20%]">
                        ক্রেতার নাম
                    </label>
                    <div className="w-[80%] flex justify-center gap-1">
                        <Select
                            id="customer"
                            name="customer"
                            options={customerOptions}
                            value={selectedCustomer}
                            onChange={handleCustomerChange}
                            placeholder="Select Customer"
                            className="w-full"
                        />
                        <Link
                            to="/dashboard/add-customer"
                            className="bg-[#e94374f5] text-white px-[10px] py-1"
                        >
                            +
                        </Link>
                    </div>
                </div>

                {/* Mobile */}
                <div className="mb-2 flex items-center justify-center gap-2">
                    <label htmlFor="mobile" className="mr-2 w-[20%]">
                        মোবাইল
                    </label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Mobile No"
                        className="border p-1 rounded w-[80%]"
                    />
                </div>
                {/* Address */}
                <div className="flex items-center justify-center gap-2">
                    <label htmlFor="address" className="mr-2 w-[20%]">
                        ঠিকানা
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="border p-2 resize-none h-24  rounded w-[80%]"
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;