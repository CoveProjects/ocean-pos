import { useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pin, setPin] = useState("");
  const [cart, setCart] = useState([]);

  const correctPin = "1234"; // Change later

  const login = () => {
    if (pin === correctPin) {
      setLoggedIn(true);
      setPin("");
    } else {
      alert("Wrong PIN");
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setCart([]);
  };

  const menu = [
    { name: "Cheeseburger", price: 14 },
    { name: "Fries", price: 5 },
    { name: "Coke", price: 3 },
    { name: "Beer", price: 7 },
  ];

  const addItem = (item) => {
    const existing = cart.find((i) => i.name === item.name);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeItem = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const tax = subtotal * 0.085;
  const total = subtotal + tax;

  // LOGIN SCREEN
  if (!loggedIn) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: "Arial",
        }}
      >
        <h1>Ocean POS</h1>
        <h2>Login - Ben</h2>

        <input
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={{
            padding: 15,
            fontSize: 18,
            marginBottom: 15,
            textAlign: "center",
          }}
        />

        <button
          onClick={login}
          style={{
            padding: "15px 40px",
            fontSize: 18,
            background: "#2E86FF",
            color: "white",
            border: "none",
            borderRadius: 8,
          }}
        >
          LOGIN
        </button>
      </div>
    );
  }

  // POS SCREEN
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      {/* MENU */}
      <div style={{ flex: 2, padding: 30 }}>
        <h1>Ocean POS</h1>

        {menu.map((item, index) => (
          <button
            key={index}
            onClick={() => addItem(item)}
            style={{
              width: "45%",
              height: 100,
              margin: 10,
              fontSize: 18,
              background: "#2E86FF",
              color: "white",
              border: "none",
              borderRadius: 10,
            }}
          >
            {item.name}
            <br />${item.price}
          </button>
        ))}
      </div>

      {/* ORDER */}
      <div style={{ flex: 1, background: "#f7f9fb", padding: 30 }}>
        <h2>Ben - Logged In</h2>

        {cart.map((item, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            {item.name} x{item.qty} – $
            {(item.price * item.qty).toFixed(2)}
            <button
              onClick={() => removeItem(item.name)}
              style={{
                marginLeft: 10,
                color: "red",
                border: "none",
                background: "transparent",
              }}
            >
              ✕
            </button>
          </div>
        ))}

        <hr />
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h2>Total: ${total.toFixed(2)}</h2>

        <button
          style={{
            width: "100%",
            height: 60,
            marginTop: 10,
            background: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: 10,
          }}
        >
          CARD
        </button>

        <button
          onClick={logout}
          style={{
            width: "100%",
            height: 50,
            marginTop: 10,
            background: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: 10,
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}