import axios from 'axios';
import { useForm } from 'react-hook-form';

const CompanyProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const productsBuyDetails = {
        companyName: data.companyName,
        payableMoney: data.payableMoney,
        moneyGiven: data.moneyGiven,
    }
    try {
      const response = await axios.post('http://localhost:5000/company-products', productsBuyDetails);
      console.log('Data submitted successfully:', response.data);
      reset();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="mx-auto bg-red-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 p-6 rounded-lg shadow-lg"
      >
        {/* Company Details */}
        <h2 className="text-2xl font-semibold">Company Details</h2>
        <div className="md:grid md:grid-cols-2 md:justify-center md:items-center gap-5">

          <div className="flex flex-col space-y-2">
            <label htmlFor="companyName" className="font-medium">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="p-2 border border-gray-300 rounded"
              {...register('companyName', { required: 'Company Name is required' })}
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm">
                {errors.companyName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="payableMoney" className="font-medium">
              Payable Money
            </label>
            <input
              type="number"
              id="payableMoney"
              className="p-2 border border-gray-300 rounded"
              {...register('payableMoney', { required: 'Payable Money is required' })}
            />
            {errors.payableMoney && (
              <span className="text-red-500 text-sm">
                {errors.payableMoney.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="moneyGiven" className="font-medium">
              I Give Money
            </label>
            <input
              type="number"
              id="moneyGiven"
              className="p-2 border border-gray-300 rounded"
              {...register('moneyGiven', { required: 'Money Given is required' })}
            />
            {errors.moneyGiven && (
              <span className="text-red-500 text-sm">
                {errors.moneyGiven.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#dc4b76f5] text-white p-3 rounded-md font-semibold "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompanyProductForm;
