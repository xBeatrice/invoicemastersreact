import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  TablePagination,
  TableFooter,
  Typography,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import {
  getProducts,
  newProduct,
  updateProduct,
  deleteProductData,
  currentUser,
} from "./firebase"; // Import Firebase functions for products

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for product fields
  const [productFields, setProductFields] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productStock: "",
  });

  const fetchProductsFromFirebase = async () => {
    try {
      const productData = await getProducts();
      const products = productData.docs
        .filter((doc) => doc.data().currentUser === currentUser)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductsFromFirebase();
  }, []);

  const handleAddProduct = async () => {
    try {
      // Call the newProduct function to add a new product to Firebase
      await newProduct(
        productFields.productName,
        productFields.productDescription,
        productFields.productPrice,
        productFields.productStock,
        currentUser // Pass the current user as an argument
      );

      // Fetch the updated list of products
      fetchProductsFromFirebase();

      // Close the add dialog
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async () => {
    try {
      // Call the updateProduct function from Firebase
      await updateProduct(
        selectedProduct.id,
        productFields.productName,
        productFields.productDescription,
        productFields.productPrice,
        productFields.productStock
      );

      // Fetch the updated list of products
      fetchProductsFromFirebase();

      // Close the edit dialog
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      // Call the deleteProductData function from Firebase
      await deleteProductData(selectedProduct.id);

      // Fetch the updated list of products
      fetchProductsFromFirebase();

      // Close the delete dialog
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const columns = [
    { id: "productName", label: "Product Name" },
    { id: "productDescription", label: "Description" },
    { id: "productPrice", label: "Price" },
    { id: "productStock", label: "Stock" },
    { id: "options", label: "Options" },
  ];

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    // Set initial values for edit fields using the product object
    setProductFields({
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productStock: product.productStock,
    });
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleProductFieldChange = (event) => {
    const { name, value } = event.target;
    setProductFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setOpenAddDialog(true)}
      >
        Add Product
      </Button>
      <TableContainer sx={{ mt: "20px" }} component={Paper}>
        <Table key={rowsPerPage}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <Typography variant="subtitle1">{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Typography variant="body1">
                      {product.productName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {product.productDescription}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {product.productPrice}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {product.productStock}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(product)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={5}
                count={products.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Add Product Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: "16px" }}
            label="Product Name"
            fullWidth
            variant="outlined"
            name="productName"
            value={productFields.productName}
            onChange={handleProductFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="Description"
            fullWidth
            variant="outlined"
            name="productDescription"
            value={productFields.productDescription}
            onChange={handleProductFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="Price"
            fullWidth
            variant="outlined"
            name="productPrice"
            value={productFields.productPrice}
            onChange={handleProductFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="Stock"
            fullWidth
            variant="outlined"
            name="productStock"
            value={productFields.productStock}
            onChange={handleProductFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: "16px" }}
            label="Product Name"
            fullWidth
            variant="outlined"
            name="productName"
            value={productFields.productName}
            onChange={handleProductFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="Description"
            fullWidth
            variant="outlined"
            name="productDescription"
            value={productFields.productDescription}
            onChange={handleProductFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="Price"
            fullWidth
            variant="outlined"
            name="productPrice"
            value={productFields.productPrice}
            onChange={handleProductFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="Stock"
            fullWidth
            variant="outlined"
            name="productStock"
            value={productFields.productStock}
            onChange={handleProductFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this product?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyProducts;
