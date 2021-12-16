import React from 'react'

export const Products = ({products}) => {
    return products.map((individualProduct)=>(
        <div className='product' key={individualProduct.ID}>
            <div className='product-img'>
                <img src={individualProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualProduct.title}</div>
            <div className='product-text description'>{individualProduct.description}</div>
            <div className='product-text price'>$ {individualProduct.price}</div>
        </div> 
    ))
}
