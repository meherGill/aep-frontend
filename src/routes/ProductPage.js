import React, { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard/ProductCard"
import "./productPage.css"
import CartModal from "../modal/CartModal"

let ProductPage = ({user  , insurance_type, location_discount, setShowInsurance}) => {

    const [list_of_added_insurance, setListOfAddedInsurance] = useState([])

    const addToCartHandler = (id) => {
        let oldlist = [...list_of_added_insurance]
        oldlist.push(id)
        setListOfAddedInsurance(oldlist)
    }

    const getCartModal = () => {
        const cartModal = document.querySelector("#CartModal")
        cartModal.classList.add("ShowModal")
    }

    return(
        <>
        <main> 
        <CartModal user={user} list_of_items={list_of_added_insurance}/>
            <ProductCard id="1" cardAddToCartHandler={addToCartHandler}/>
            <ProductCard id="2" cardAddToCartHandler={addToCartHandler}/>
            <ProductCard id="3" cardAddToCartHandler={addToCartHandler}/>
            <ProductCard id="4" cardAddToCartHandler={addToCartHandler}/>
            <ProductCard id="5" cardAddToCartHandler={addToCartHandler}/>
            <ProductCard id="6" cardAddToCartHandler={addToCartHandler}/>
        </main>
        <button onClick={getCartModal} className="cartButton">QUOTE</button>
        </>
    )
}

export default ProductPage