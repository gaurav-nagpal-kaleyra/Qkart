import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  return (
    <Card className="card">
      <img src={product.image} style={{ height: "250px" }} />
      <CardContent>
        <Typography>{product.name}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>${product.cost}</Typography>
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions className="card-actions">
        <Button
          variant="contained"
          className="card-button"
          sx={{ width: "100%" }}
          onClick={() => {
            handleAddToCart(token, [], [], product._id, undefined, "");
          }}
        >
          <AddShoppingCartOutlined sx={{ marginRight: "10px" }} />
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
