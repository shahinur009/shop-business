import CustomerInfo from "./CustomerInfo";
import ProductsInfo from "./ProductsInfo";
import Amount from "./Amount";

const ProductInfo = () => {

    return (
        <>
            {/* Customer Information */}
            <CustomerInfo />

            {/* Product Information */}
            <ProductsInfo />

            {/* Amount Details */}
            <Amount />
        </>
    );
};

export default ProductInfo;