// pages/index.tsx
import React from "react";

// import ProductsOrganizer from "./components/ProductsOrganizer";
import UsersOrganizer from "./components/users/UsersOrganizer";

const Home: React.FC = () => {
  return (
    <div>
      {/* <ProductsOrganizer /> */}
      <UsersOrganizer />
    </div>
  );
};

export default Home;
