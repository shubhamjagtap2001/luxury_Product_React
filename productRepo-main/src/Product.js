import React, { useState, useEffect } from 'react';
import { FaRupeeSign, FaStar } from "react-icons/fa";
import { MdOutlinePercent } from "react-icons/md";


const Product = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productData, setProductData] = useState([]);

    const fetchProductCategories = () => {
        return fetch('https://dummyjson.com/products/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data))
    };

    
    const fetchProductData = () => {
        return fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((data) => setProductData(data.products))
    };

    useEffect(() => {
        fetchProductCategories();
        fetchProductData();
    }, []);

    const filteredData = selectedCategory ? productData.filter(item => item.category === selectedCategory) : productData;

    const handleCategoryName = (event) => {
        debugger
        setSelectedCategory(event.target.value);
    };

console.log(filteredData,'aaaa');
    return (
        <div style={{backgroundColor:"antiquewhite"}}>
            <label>Select a category name : </label>
            <select value={selectedCategory} onChange={handleCategoryName}>
                
                <option >All Product</option>
                {categories.map(x => (
                    <option key={x.slug} value={x.slug}>
                        {x.name}
                    </option>
                ))}
            </select>
                                                 
            <h2>Products List</h2>
            <div className="row">
                {filteredData.length !== 0 ?
                    filteredData.map((x) => (
                        <div className="col-md-4">
                            <div className="card border-5" >
                                <div className='custom-effect'>
                                    <img src={x.thumbnail} alt={x.title} className="card-img-top" height="300" width="150" />
                                </div>
                                <div class="card-body">
                                    <h2 textAlign="center">
                                        {x.title}
                                    </h2>
                                    <div>{x.description}</div>
                                    <div className='row text-center'>
                                        <div className='col-md-3 '>
                                            <FaStar />
                                            {x.rating}
                                        </div>
                                        <div className='col-md' style={{ marginRight: '40px' }}>
                                            <FaRupeeSign />
                                            {x.price} only
                                        </div>
                                        <div className='col-md-3 color-green'>
                                            <strong> {x.discountPercentage}
                                                <MdOutlinePercent /> off</strong>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )) : <h3>Record is not available</h3>}
            </div>
        </div>
    );
};

export default Product;

