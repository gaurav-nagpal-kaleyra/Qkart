import {
  ContactPageSharp,
  Search,
  SentimentDissatisfied,
} from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart, { generateCartItemsFrom } from "./Cart.js";
// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartData, setCartData] = useState([]);
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    const url = config.endpoint + "/products";

    return await axios
      .get(url)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error", autoHideDuration: 2000 }
        );
        setLoading(false);
      });
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    const url = `${config.endpoint}/products/search?value=${text}`;

    await axios
      .get(url)
      .then((res) => {
        setProductsList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setProductsList([]);
        }
        // console.log(err.response.status);
        setLoading(false);
      });
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */

  const debounceSearch = (event, debounceTimeout) => {
    setTimeout(() => {
      performSearch(event.target.value);
    }, debounceTimeout);
  };

  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with    and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    const itemFound = items.find((item) => item.productId === productId);
    // console.log(itemFound.);
    if (itemFound) {
      return true;
    }

    return false;
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    let body = [];

    if (!token) {
      enqueueSnackbar("You should be logged use cart feature", {
        variant: "warning",
      });
      return;
    } else if (qty !== undefined) {
      body = {
        productId: productId,
        qty: qty,
      };
    } else {
      if (isItemInCart(cartData, productId)) {
        enqueueSnackbar(
          "Item already in cart. Use the cart sidebar to update quantity or remove item.",
          {
            variant: "warning",
            autoHideDuration: 2000,
          }
        );
        return;
      } else {
        body = {
          productId: productId,
          qty: 1,
        };
      }
    }
    // post request here

    const response = axios.post(`${config.endpoint}/cart`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    response.then((res) => {
      setCartData(res.data);
    });
  };

  const fetchCart = async (token) => {
    if (!token) return;

    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      return await axios
        .get(`${config.endpoint}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        });
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };

  useEffect(() => {
    performAPICall().then((res) => {
      setProductsList(res.data);
      setLoading(false);
    });
    if (localStorage.getItem("username") !== null) {
      setLoggedIn(true);
      const token = localStorage.getItem("token");
      fetchCart(token).then((response) => {
        setCartData(response);
      });
    }
  }, []);

  return (
    <div>
      <Header
        hasHiddenAuthButtons={true}
        children={{ viewSearchBar: true, callApi: debounceSearch }}
      />

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e) => debounceSearch(e, 500)}
      />

      <Grid container>
        <Grid item md={loggedIn ? 9 : 12}>
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>
              to your door step
            </p>
          </Box>
          <Grid container spacing={2} sx={{ p: 1 }}>
            {loading ? (
              <Box className="loading">
                <CircularProgress color="success" />
                <Typography>Loading Products</Typography>
              </Box>
            ) : productsList.length !== 0 ? (
              productsList.map((product) => {
                return (
                  <Grid item xs={6} md={3} key={product._id}>
                    <ProductCard
                      product={product}
                      handleAddToCart={addToCart}
                    />
                  </Grid>
                );
              })
            ) : (
              <Box className="loading">
                <SentimentDissatisfied />
                <Typography>No Products Found</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
        {loggedIn ? (
          <Grid item md={3} sm={12} xs={12} sx={{ backgroundColor: "#E9F5E1" }}>
            <Box sx={{ p: 0.3 }}>
              <Cart
                products={productsList}
                items={generateCartItemsFrom(cartData, productsList)}
                handleQuantity={addToCart}
              />
            </Box>
          </Grid>
        ) : (
          ""
        )}
      </Grid>

      <Footer />
    </div>
  );
};

export default Products;
