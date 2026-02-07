import { useState } from 'react';
import './App.css';

function App() {
  const products = [
    { id: 1, name: 'Laptop', price: 999, image: '💻' },
    { id: 2, name: 'Phone', price: 699, image: '📱' },
    { id: 3, name: 'Headphones', price: 199, image: '🎧' },
    { id: 4, name: 'Watch', price: 299, image: '⌚' }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);


  return (
    <div className="App">
      <h1>My Shopping Cart</h1>

      <div className="cart-section">
        <h2>Shopping Cart ({cart.length} items)</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Start shopping!</p>
        ) : (
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <span className="cart-item-image">{item.image}</span>

                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price}</p>
                  <p className="item-total">
                    Subtotal: ${item.price * item.quantity}
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    className="btn-small"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="btn-small"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {cart.length > 0 && (
  <div className="cart-total">
    <h3>Total: ${totalPrice}</h3>
  </div>
)}

      </div>

      <div className="products">
        <h2>Products</h2>

        {products.map(product => (
          <div key={product.id} className="product-card">
            <span className="product-image">{product.image}</span>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
