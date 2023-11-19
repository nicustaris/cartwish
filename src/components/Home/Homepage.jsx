import React from "react";
import Herosection from "./Herosection";

import iphone from "../../assets/iphone.png";
import macbook from "../../assets/macbook.png";
import Featuredproducts from "./Featuredproducts";

const Homepage = () => {
  return (
    <div>
      <Herosection
        title="iPhone 14 Pro"
        subtitle="Unleash the future with the iPhone 15 - a perfect blend of style, power, and innovation in a single device."
        link="/product/6538494488ed7058951f07d9"
        image={iphone}
      />
      <Featuredproducts />
      <Herosection
        title="MacBook Pro 16-inch with M1 Pro/M1 Max"
        subtitle="Elevate your productivity with the powerful MacBook Pro 16-inch, featuring Apple's M1 Pro/M1 Max chips for exceptional performance and stunning visuals. Experience the future of computing."
        link="/product/6538494488ed7058951f07e1"
        image={macbook}
      />
    </div>
  );
};

export default Homepage;
