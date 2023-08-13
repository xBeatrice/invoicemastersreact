import React, { useState } from "react";
import {
  Card,
  Button,
  Container,
  Typography,
  TextField,
  CardContent,
} from "@mui/material";
import { signIn, register } from "./firebase";
import { useNavigate } from "react-router-dom";

const AuthentificationPage = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(true);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [showNewAccDialog, setShowNewAccDialog] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate();

  const signInDialog = () => {
    setShowAuthDialog(false);
    setShowSignInDialog(true);
  };

  const newAccDialog = () => {
    setShowAuthDialog(false);
    setShowNewAccDialog(true);
  };

  const goBack = () => {
    setShowAuthDialog(true);
    setShowSignInDialog(false);
    setShowNewAccDialog(false);
  };

  const handleSignIn = () => {
    signIn(signInEmail, signInPassword)
      .then((userCredential) => {
        // Handle successful sign-in
        console.log("User signed in:", userCredential.user);
        navigate("/projects");
        // You can navigate to another page or update your component's state
      })
      .catch((error) => {
        // Handle sign-in error
        alert("Email sau parola gresita. Incearca din nou!");
        console.error(error.code, error.message);
      });
  };

  const handleRegister = () => {
    register(registerEmail, registerPassword)
      .then((userCredential) => {
        // Handle successful registration
        console.log("User registered:", userCredential.user);
        navigate("/projects");
        // You can navigate to another page or update your component's state
      })
      .catch((error) => {
        // Handle registration error
        alert(
          "Adresa de mail nu exista sau deja a fost creat un cont cu aceasta adresa."
        );
        console.error(error.code, error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <div style={{ marginTop: "50%" }}>
          {showAuthDialog && (
            <Card
              variant="outlined"
              sx={{ height: "400px", width: "400px", alignItems: "center" }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "26%",
                }}
              >
                <Typography variant="h6" sx={{ mb: "20px" }}>
                  Do you already have an account?
                </Typography>

                <Button
                  sx={{ width: "260px", m: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={signInDialog}
                >
                  I have an account
                </Button>

                <Button
                  sx={{ width: "260px", m: "10px" }}
                  variant="contained"
                  color="secondary"
                  onClick={newAccDialog}
                >
                  Create a new account
                </Button>
              </CardContent>
            </Card>
          )}

          {showSignInDialog && (
            <Card
              variant="outlined"
              id="signInDialog"
              sx={{ height: "400px", width: "400px", alignItems: "center" }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "20%",
                }}
              >
                <Typography variant="h6" sx={{ mb: "20px" }}>
                  Enter your account!
                </Typography>
                <TextField
                  style={{ width: "90%", marginBottom: "10px" }}
                  label="Email"
                  variant="outlined"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
                <TextField
                  style={{ width: "90%", marginBottom: "10px" }}
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
                <Typography
                  variant="body1"
                  sx={{ cursor: "pointer", mt: "10px" }}
                  onClick={goBack}
                >
                  Go back
                </Typography>
              </CardContent>
            </Card>
          )}

          {showNewAccDialog && (
            <Card
              variant="outlined"
              id="newAccDialog"
              sx={{ height: "400px", width: "400px", alignItems: "center" }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "20%",
                }}
              >
                <Typography variant="h6" sx={{ mb: "20px" }}>
                  Fill in the details below!
                </Typography>
                <TextField
                  style={{ width: "90%", marginBottom: "10px" }}
                  label="Email"
                  variant="outlined"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <TextField
                  style={{ width: "90%", marginBottom: "10px" }}
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRegister}
                >
                  Create account
                </Button>
                <Typography
                  variant="body1"
                  sx={{ cursor: "pointer", mt: "10px" }}
                  onClick={goBack}
                >
                  Go back
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AuthentificationPage;
