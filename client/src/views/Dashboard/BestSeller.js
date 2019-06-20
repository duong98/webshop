import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";

import * as productServices from "services/product.services";

export default function BestSeller() {
  const bestSeller = useBestSellerProduct();
  return (
    <Paper className="p-4" style={{ minWidth: 350 }}>
      <div className="font-medium text-xl">Monthly Best Seller</div>
      <div className="w-full flex justify-center mt-8">
        <img
          src={bestSeller.imageurl}
          style={{ height: 180, width: 180 }}
          alt=""
        />
      </div>
      <div className="font-normal text-lg text-center mt-4">
        {bestSeller.title}
      </div>
      <div className="font-normal text-lg text-center text-red-600">
        {bestSeller.price} $
      </div>
    </Paper>
  );
}

function useBestSellerProduct() {
  const [bestSeller, setBestSeller] = useState({});

  useEffect(() => {
    async function getBestSeller() {
      const response = await productServices.getBestSeller();
      setBestSeller(response);
    }
    getBestSeller();
  }, []);

  return bestSeller;
}
