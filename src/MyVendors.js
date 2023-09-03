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
  getVendors,
  newVendor,
  updateVendor,
  deleteVendorData,
  currentUser,
} from "./firebase"; // Import Firebase functions for vendors

const MyVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for vendor fields
  const [vendorFields, setVendorFields] = useState({
    vendorName: "",
    address: "",
    vat: "",
    email: "",
  });

  const fetchVendorsFromFirebase = async () => {
    try {
      const vendorData = await getVendors();
      const vendors = vendorData.docs
        .filter((doc) => doc.data().currentUser === currentUser)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setVendors(vendors);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchVendorsFromFirebase();
  }, []);

  const handleAddVendor = async () => {
    try {
      // Call the newVendor function to add a new vendor to Firebase
      await newVendor(
        vendorFields.vendorName,
        vendorFields.address,
        vendorFields.vat,
        vendorFields.email,
        currentUser // Pass the current user as an argument
      );

      // Fetch the updated list of vendors
      fetchVendorsFromFirebase();

      // Close the add dialog
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  const handleEditVendor = () => {
    setOpenEditDialog(true);
  };

  const handleDeleteVendor = () => {
    setOpenDeleteDialog(true);
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
    { id: "vendorName", label: "Vendor Name" },
    { id: "vendorAdress", label: "Address" },
    { id: "vendorVAT", label: "VAT" },
    { id: "vendorEmail", label: "Email" },
    { id: "options", label: "Options" },
  ];

  const handleEditClick = (vendor) => {
    setSelectedVendor(vendor);
    // Set initial values for edit fields using the vendor object
    setVendorFields({
      vendorName: vendor.vendorName,
      address: vendor.vendorAdress,
      vat: vendor.vendorVAT,
      email: vendor.vendorEmail,
    });
    handleEditVendor();
  };

  const handleDeleteClick = (vendor) => {
    setSelectedVendor(vendor);
    handleDeleteVendor();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Change handler for vendor fields
  const handleVendorFieldChange = (event) => {
    const { name, value } = event.target;
    setVendorFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const saveVendor = async () => {
    try {
      // Call the updateVendor function from Firebase
      await updateVendor(
        selectedVendor.id,
        vendorFields.vendorName,
        vendorFields.address,
        vendorFields.vat,
        vendorFields.email
      );

      // Fetch the updated list of vendors
      fetchVendorsFromFirebase();

      // Close the edit dialog
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const deleteVendor = async () => {
    try {
      // Call the deleteVendorData function from Firebase
      await deleteVendorData(selectedVendor.id);

      // Fetch the updated list of vendors
      fetchVendorsFromFirebase();

      // Close the delete dialog
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setOpenAddDialog(true)}
      >
        Add Vendor
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
            {vendors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <Typography variant="body1">{vendor.vendorName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {vendor.vendorAdress}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{vendor.vendorVAT}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {vendor.vendorEmail}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(vendor)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(vendor)}>
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
                count={vendors.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Add Vendor Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Vendor</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: "16px" }}
            label="Vendor Name"
            fullWidth
            variant="outlined"
            name="vendorName" // Field name
            value={vendorFields.vendorName}
            onChange={handleVendorFieldChange} // Change handler
          />
          <TextField
            sx={{ mt: "16px" }}
            label="Address"
            fullWidth
            variant="outlined"
            name="address"
            value={vendorFields.address}
            onChange={handleVendorFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="VAT"
            fullWidth
            variant="outlined"
            name="vat"
            value={vendorFields.vat}
            onChange={handleVendorFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="Email"
            fullWidth
            variant="outlined"
            name="email"
            value={vendorFields.email}
            onChange={handleVendorFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddVendor} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Vendor Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Vendor</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: "16px" }}
            label="Vendor Name"
            fullWidth
            variant="outlined"
            name="vendorName"
            value={vendorFields.vendorName}
            onChange={handleVendorFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="Address"
            fullWidth
            variant="outlined"
            name="address"
            value={vendorFields.address}
            onChange={handleVendorFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="VAT"
            fullWidth
            variant="outlined"
            name="vat"
            value={vendorFields.vat}
            onChange={handleVendorFieldChange}
          />
          <TextField
            sx={{ mt: "16px" }}
            label="Email"
            fullWidth
            variant="outlined"
            name="email"
            value={vendorFields.email}
            onChange={handleVendorFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={saveVendor} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Vendor Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Vendor</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this vendor?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteVendor} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyVendors;
