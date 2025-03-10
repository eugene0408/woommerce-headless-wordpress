import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// Selectors
import { selectProductsLoading } from "../redux/selectors/productsSelectors";
// MUI
import Grid from "@mui/material/Grid2";
import { Pagination } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Components
import { SectionWrapper } from "./SectionWrapper";
import { ProductCard } from "./ProductCard";
import { LoadingCircular } from "./LoadingCircular";

export const ProductsList = ({ products }) => {
  const productsLoading = useSelector(selectProductsLoading);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [page, setPage] = useState(1);
  const productsPerPage = isMobile ? 6 : 12;

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = page * productsPerPage;

  const paginatedProducts = products.slice(startIndex, endIndex);

  const productsContainerRef = useRef(null);
  useEffect(() => {
    if (productsContainerRef.current) {
      productsContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        window.scrollBy({ top: -300, behavior: "smooth" });
      }, 300);
    }
  }, [page]);

  return (
    <div ref={productsContainerRef}>
      <SectionWrapper>
        {productsLoading && <LoadingCircular />}

        {/* Display products list */}
        {productsLoading === false &&
          products.length > 0 &&
          paginatedProducts.map((product) => (
            <Grid
              key={`pro${product.id}`}
              size={{ xs: 4 }}
              sx={{ display: "flex", justifyContent: "center" }}
              item
            >
              <ProductCard product={product} />
            </Grid>
          ))}

        {/* Display pagination */}
        {products.length > productsPerPage && (
          <Pagination
            count={Math.ceil(products.length / productsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: 2,
            }}
          />
        )}
      </SectionWrapper>
    </div>
  );
};
