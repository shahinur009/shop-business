
const Header = () => {
    return (
        <>
            <div className="bg-red-200 p-1 mb-[6px] rounded flex justify-between items-center text-sm">
                <div className="flex items-center">
                    <label htmlFor="invoiceNo" className="mr-2 ">Invoice no</label>
                    <input
                        type="text"
                        id="invoiceNo"
                        value="2400440"
                        className="border p-1 rounded"
                        readOnly
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="employee" className="mr-2 ">Employee</label>
                    <select id="employee" className="border p-1 rounded">
                        <option>Select Employee</option>
                        <option>John Doe</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <label htmlFor="reference" className="mr-2">Reference</label>
                    <input
                        type="text"
                        id="reference"
                        placeholder="Reference"
                        className="border p-1 rounded"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="saleDate" className="mr-2">Sale Date</label>
                    <input
                        type="date"
                        id="saleDate"
                        className="border p-1 rounded"
                        value="2024-10-10"
                    />
                </div>
            </div>
        </>
    );
};

export default Header;