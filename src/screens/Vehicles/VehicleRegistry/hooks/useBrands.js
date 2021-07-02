import { useEffect, useState } from "react";

import { getAllBrands } from "../../../Brands/services";

import brandsParser from "../brandsParser";

const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadBrands = () => {
    getAllBrands()
      .then((data) => {
        setBrands(brandsParser(data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    loadBrands();
  }, []);

  return { brands, isLoading }
};

export default useBrands;
