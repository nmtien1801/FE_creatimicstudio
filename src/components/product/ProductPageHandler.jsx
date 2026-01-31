import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import Products from '../../clientPages/SanPham';
import ProductDetail from './ProductDetail';

const ProductPageHandler = () => {
    const { id_product } = useParams();

    // Nếu id_product là 'all', hiện trang danh sách (Products)
    // Ngược lại, hiện trang chi tiết (ProductDetail)
    if (id_product === 'all') {
        return <Products />;
    }

    return <ProductDetail />;
};

export default ProductPageHandler;