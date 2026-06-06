import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useUserAuth } from '../context/UserAuthContext'
import { Container, Section } from '../components/Common'

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart()
  const { user, isAuthenticated } = useUserAuth()

  const ACCENT_COLOR = '#C89B3C'
  const PRIMARY_COLOR = '#0E4B33'

  return (
    <Section className="bg-gray-50 py-8 sm:py-12 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto px-2">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <FaShoppingCart size={24} className="sm:w-8 sm:h-8" style={{ color: PRIMARY_COLOR }} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Shopping Cart</h1>
              <p className="text-sm sm:text-base text-gray-600">{cartItems.length} item(s)</p>
            </div>
          </div>

          {!isAuthenticated ? (
            // Not logged in message
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-8 text-center mb-8">
              <FaShoppingCart size={36} className="sm:w-12 sm:h-12 mx-auto mb-4 text-blue-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                Please Log In to View Your Cart
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                You need to be logged in to manage your donations and cart
              </p>
              <Link
                to="/login"
                className="inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 text-sm sm:text-base"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                Go to Login
              </Link>
            </div>
          ) : cartItems.length === 0 ? (
            // Empty cart message
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center">
              <FaShoppingCart size={36} className="sm:w-12 sm:h-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Start by donating to our causes to fill up your cart
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 text-sm sm:text-base"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                <FaArrowLeft size={18} className="sm:w-5 sm:h-5" />
                Back to Home
              </Link>
            </div>
          ) : (
            // Cart items
            <div className="space-y-4 sm:space-y-6">
              {/* User Info */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Donor Information</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span> {user?.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span> {user?.email}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800">Donation Items</h3>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="p-3 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition gap-2">
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <div
                            className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0"
                            style={{ backgroundColor: ACCENT_COLOR }}
                          >
                            {index + 1}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                              {item.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Added at {new Date(item.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition flex-shrink-0"
                        title="Remove item"
                      >
                        <FaTrashAlt size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-800">
                    <span>Total Items:</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 space-y-2 sm:space-y-3">
                    <button
                      className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 text-sm sm:text-base"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                      Proceed to Checkout
                    </button>
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={() => clearCart()}
                        className="flex-1 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-red-600 border-2 border-red-600 hover:bg-red-50 transition text-sm sm:text-base"
                      >
                        Clear Cart
                      </button>
                      <Link
                        to="/"
                        className="flex-1 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-800 hover:bg-gray-50 transition text-center text-sm sm:text-base"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}

export default Cart
