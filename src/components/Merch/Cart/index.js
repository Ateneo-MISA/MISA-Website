import { StaticImage } from 'gatsby-plugin-image'
import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'

import Layout from '../../Layout/index'
import Button from '../../Elements/Button'

import { MerchContext } from '../MerchContext'
import { update } from 'lodash'

const Cart = () => {
  const [cartTotal, setCartTotal] = useState(0)
  const { cart, deleteFromCart, updateItemQuantity } = useContext(MerchContext)

  useEffect(() => {
    let total = 0

    for (let i = 0; i < cart.length; i++) {
      total += cart[i]?.totalPrice
    }

    if (total !== cartTotal) {
      setCartTotal(total)
    }
  }, [cart, cartTotal])

  return (
    <Layout>
      <div className="m-16">
        <div className="flex">
          <StaticImage
            className="w-[50px] h-[50px] cursor-pointer mr-5"
            src="../../../../static/images/merchCart.png"
          />
          <p className="text-4xl font-extrabold">Your Shopping Cart</p>
        </div>

        <table className="mt-5 w-full">
          <thead>
            <tr>
              <th className="border-b-2 border-[#D9E8EC] pb-5 text-[#2097A2] font-normal text-base w-1/2 text-left">
                PRODUCT
              </th>
              <th className="border-b-2 border-[#D9E8EC] pb-5 text-[#2097A2] font-normal text-base text-left w-[16%]">
                PRICE
              </th>
              <th className="border-b-2 border-[#D9E8EC] pb-5 text-[#2097A2] font-normal text-base text-left w-[16%]">
                QUANTITY
              </th>
              <th className="border-b-2 border-[#D9E8EC] pb-5 text-[#2097A2] font-normal text-base text-left w-[16%]">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart?.map((item, index) => {
                return (
                  <tr>
                    <td className="p-5 border-b-2 border-[#D9E8EC] flex">
                      <img
                        className="lg:h-[200px] lg:w-[200px]"
                        src={item?.photoURL}
                      />
                      <div className="flex justify-center ml-6 flex-col">
                        <p className="text-2xl font-extrabold">{item?.name}</p>
                        <p>Size: {item?.selectedCategory}</p>
                      </div>
                    </td>
                    <td className="py-5 border-b-2 border-[#D9E8EC]">
                      <p className="text-xl">₱{item?.price}</p>
                    </td>
                    <td className="py-5 border-b-2 border-[#D9E8EC]">
                      <div className="flex">
                        <div className="text-xl font-medium py-2 text-[#31ADAF] border-2 rounded-md border-[#31ADAF] w-[200px] flex justify-around">
                          <p
                            className="cursor-pointer"
                            onClick={() =>
                              item?.quantity > 1
                                ? updateItemQuantity(index, 'subtract')
                                : null
                            }
                          >
                            -
                          </p>
                          <p>{item?.quantity}</p>
                          <p
                            className="cursor-pointer"
                            onClick={() => updateItemQuantity(index, 'add')}
                          >
                            +
                          </p>
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => deleteFromCart(index)}
                        >
                          <StaticImage
                            className="w-[30px] h-[30px] ml-2 mt-2"
                            src="../../../../static/images/trash.png"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-5 border-b-2 border-[#D9E8EC]">
                      <p className="text-xl">₱{item?.quantity * item?.price}</p>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr className="text-[#31ADAF] text-center">
                <td colSpan={4}>
                  <p className="mt-16">No merch yet!</p>
                  <p>Start browsing by going back to our merch list.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-5 text-right">
          <p className="text-2xl font-extrabold">
            SUBTOTAL <span className="text-4xl ml-2">P{cartTotal}</span>
          </p>
          <p className="mt-2">Final payment calculated at checkout</p>
        </div>

        <div className="flex justify-between mt-5">
          <Link to="/merch">
            <div className="flex">
              <StaticImage
                className="w-[30px] h-[30px] mr-4"
                src="../../../../static/images/merchBack.png"
              />
              <p className="text-[#31ADAF] text-lg">Back to merch</p>
            </div>
          </Link>

          <Button className="w-1/6" variant="primary">
            Check out
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
