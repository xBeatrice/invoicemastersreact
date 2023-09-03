import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  auth,
  getCompanyInfo,
  newCompany,
  updateCompanyInfo,
  logOut,
  resetPassword,
  currentUser,
} from "./firebase";
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const ProfilePage = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyAdress, setCompanyAdress] = useState("");
  const [companyVAT, setCompanyVAT] = useState("");
  const [companyIBAN, setCompanyIBAN] = useState("");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleMyVendorsClick = () => {
    navigate("/myVendors");
  };

  const handleMyProductsClick = () => {
    navigate("/myProducts");
  };

  const handleMyProjectsClick = () => {
    navigate("/projects");
  };

  useEffect(() => {
    // Load company information when the component mounts
    loadCompanyInfo();
  }, []);

  const loadCompanyInfo = async () => {
    try {
      const companies = await getCompanyInfo();
      // Ensure that companies is an array
      if (companies) {
        const company = companies.docs.find(
          (c) => c.data.currentUser === currentUser
        );
        if (company) {
          setCompanyName(company.data.companyName || "");
          setCompanyAdress(company.data.companyAdress || "");
          setCompanyVAT(company.data.companyVAT || "");
          setCompanyIBAN(company.data.companyIBAN || "");
        }
      } else {
        console.error("Companies is not an array:", companies);
      }
    } catch (error) {
      console.error("Error fetching company information:", error);
    }
  };

  const handleUpdateCompanyInfo = async () => {
    try {
      const companies = await getCompanyInfo();
      // Ensure that companies is an array
      if (companies) {
        const company = companies.docs.find(
          (c) => c.data.currentUser === currentUser
        );
        if (company) {
          // Company exists, update it
          await updateCompanyInfo(
            company.id,
            companyName,
            companyAdress,
            companyVAT,
            companyIBAN,
            currentUser,
            company.data.companyInvoiceNo
          );
          console.log("Company information updated successfully");
        } else {
          // Company doesn't exist, create a new one
          await newCompany(
            companyName,
            companyAdress,
            companyVAT,
            companyIBAN,
            currentUser
          );
          console.log("Company information added successfully");
        }
      } else {
        console.error("Companies is not an array:", companies);
      }
    } catch (error) {
      console.error("Error updating or adding company information:", error);
    }
  };

  const handleLogOut = () => {
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    logOut()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const handleResetPassword = () => {
    setResetPasswordDialogOpen(true);
  };

  const handleConfirmResetPassword = () => {
    setResetPasswordDialogOpen(false);
    resetPassword(currentUser)
      .then(() => {
        console.log("Password reset email sent successfully");
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
      });
  };

  const handleCancelResetPassword = () => {
    setResetPasswordDialogOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={3} sx={{ mt: "10px" }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Company Information</Typography>
            <TextField
              sx={{ mt: "10px" }}
              fullWidth
              label="Name"
              variant="outlined"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              sx={{ mt: "10px" }}
              fullWidth
              label="Address"
              variant="outlined"
              value={companyAdress}
              onChange={(e) => setCompanyAdress(e.target.value)}
            />
            <TextField
              sx={{ mt: "10px" }}
              fullWidth
              label="VAT no."
              variant="outlined"
              value={companyVAT}
              onChange={(e) => setCompanyVAT(e.target.value)}
            />
            <TextField
              sx={{ mt: "10px" }}
              fullWidth
              label="IBAN"
              variant="outlined"
              value={companyIBAN}
              onChange={(e) => setCompanyIBAN(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateCompanyInfo}
              sx={{ mt: 2 }}
            >
              Update Company Information
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">User Information</Typography>
              <Typography variant="subtitle1"></Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <div style={{ display: "grid", margin: "auto" }}>
                <Button
                  sx={{ mt: "10px" }}
                  variant="contained"
                  onClick={handleLogOut}
                >
                  Log out
                </Button>
                <Button
                  sx={{ mt: "10px" }}
                  variant="contained"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
                <Button
                  sx={{ mt: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleMyVendorsClick}
                >
                  My Vendors
                </Button>
                <Button
                  sx={{ mt: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleMyProductsClick}
                >
                  My Products
                </Button>
                <Button
                  sx={{ mt: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleMyProjectsClick}
                >
                  My Projects
                </Button>
              </div>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Logout Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleCancelLogout}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog
        open={resetPasswordDialogOpen}
        onClose={handleCancelResetPassword}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Password Reset</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to reset your password?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelResetPassword} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmResetPassword} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
