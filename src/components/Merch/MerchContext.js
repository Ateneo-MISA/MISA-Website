import React, { useState } from 'react'
import { navigate } from 'gatsby'

export const MerchContext = React.createContext()

export const MerchContextProvider = ({ children }) => {
  // Define your global state or functions here
  const [cart, setCart] = useState([])
  const [orderNumber, setOrderNumber] = useState(null)

  const addToCart = (
    quantity,
    product,
    selectedCategory,
    bundle,
    bundleItems
  ) => {
    if (bundle) {
      let subItem = {
        name: product?.name,
        bundle: true,
        price: product?.price,
        quantity: quantity,
        totalPrice: product?.price * quantity,
        photoURL: product?.photo?.file?.url,
        bundleItems: bundleItems,
      }
      setCart([...cart, subItem])
    } else {
      let subItem = {
        name: product?.name,
        price: product?.price,
        quantity: quantity,
        selectedCategory: selectedCategory,
        totalPrice: product?.price * quantity,
        photoURL: product?.photo?.file?.url,
        categoryName: product?.categoryName,
      }

      setCart([...cart, subItem])
    }

    navigate('/merch/cart')
  }

  const updateQuantityOfItemAlreadyInCart = (
    quantity,
    product,
    selectedCategory,
    bundle,
    bundleItems
  ) => {
    if (bundle) {
      for (let i = 0; i < cart.length; i++) {
        if (
          product?.name === cart[i]?.name &&
          JSON.stringify(bundleItems) === JSON.stringify(cart[i]?.bundleItems)
        ) {
          let item = cart[i]
          item.quantity = quantity
          item.totalPrice = quantity * item.price

          let updatedCart = cart.map((cartItem) => {
            if (
              item.name === cartItem.name &&
              JSON.stringify(item?.bundleItems) ===
                JSON.stringify(cartItem?.bundleItems)
            )
              return item
            return cartItem
          })

          setCart(updatedCart)
          break
        }
      }
    } else {
      for (let i = 0; i < cart.length; i++) {
        if (
          product?.name === cart[i]?.name &&
          selectedCategory === cart[i]?.selectedCategory
        ) {
          let item = cart[i]
          item.quantity = quantity
          item.totalPrice = quantity * item.price

          let updatedCart = cart.map((cartItem) => {
            if (item.name === cartItem.name) return item
            return cartItem
          })

          setCart(updatedCart)
          break
        }
      }
    }
    navigate('/merch/cart')
  }

  const deleteFromCart = (indexToDelete) => {
    let updatedCart = cart.filter((_, index) => index !== indexToDelete)
    setCart(updatedCart)
  }

  const updateItemQuantity = (index, operation) => {
    if (operation === 'add') {
      let item = cart[index]
      item.quantity += 1
      item.totalPrice = item.price * item.quantity
      let updatedCart = cart.map((cartItem) => {
        if (
          item.name === cartItem.name &&
          item.selectedCategory === cartItem.selectedCategory
        )
          return item
        return cartItem
      })

      setCart(updatedCart)
    }

    if (operation === 'subtract') {
      let item = cart[index]
      item.quantity -= 1
      item.totalPrice = item.price * item.quantity
      let updatedCart = cart.map((cartItem) => {
        if (
          item.name === cartItem.name &&
          item.selectedCategory === cartItem.selectedCategory
        )
          return item
        return cartItem
      })

      setCart(updatedCart)
    }
  }

  const emptyCart = () => {
    setCart([])
  }

  // Make the global context and its values accessible to all child components
  return (
    <MerchContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantityOfItemAlreadyInCart,
        deleteFromCart,
        updateItemQuantity,
        orderNumber,
        setOrderNumber,
        emptyCart,
      }}
    >
      {children}
    </MerchContext.Provider>
  )
}
