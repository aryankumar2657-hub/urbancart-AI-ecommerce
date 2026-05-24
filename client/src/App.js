import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import "./app.scss";

const AiShoppingAssistant = () => {
  const [shoppingGoal, setShoppingGoal] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");

  const recommendProduct = () => {
    const input = shoppingGoal.toLowerCase();

    if (input.includes("phone") || input.includes("mobile")) {
      setAiSuggestion("Recommended: Smartphones 📱 Best match for your search.");
    } else if (input.includes("shoe") || input.includes("fashion")) {
      setAiSuggestion("Recommended: Fashion & Footwear 👟 Best for daily use.");
    } else if (input.includes("watch") || input.includes("accessory")) {
      setAiSuggestion("Recommended: Accessories ⌚ Stylish and useful products.");
    } else if (input.includes("budget") || input.includes("cheap")) {
      setAiSuggestion("Recommended: Budget-friendly products 💰 Best value items.");
    } else {
      setAiSuggestion("Recommended: Trending products 🔥 Best picks from UrbanCart.");
    }
  };

  return (
    <div className="ai-box">
      <h2>🤖 AI Shopping Assistant</h2>
      <p>Tell us what you need and get smart product suggestions.</p>

      <input
        type="text"
        placeholder="Example: I want budget shoes for daily use"
        value={shoppingGoal}
        onChange={(e) => setShoppingGoal(e.target.value)}
      />

      <button onClick={recommendProduct}>Get AI Suggestion</button>

      {aiSuggestion && <h3>{aiSuggestion}</h3>}
    </div>
  );
};

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <AiShoppingAssistant />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products/:id", element: <Products /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;