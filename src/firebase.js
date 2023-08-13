import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase authentication and firestore
export const auth = firebase.auth();
export const db = firebase.firestore();
// AUTHENTIFICATION SERVICE

export const register = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export let currentUser = {};

export const signIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logOut = () => {
  return auth.signOut();
};

export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

//asign random unique id to users not logged in
let s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

// listen for auth status changes

let loggedIn = false;
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUser = user.email;
    loggedIn = true;
    // } else {
    // currentUser=s4()+s4()+ '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
});

//PROJECTS STORAGE SERVICE

let projectId = "";
export const newProject = (name, description, date, currentUser) => {
  return db.collection("projects").add({
    name,
    description,
    date,
    currentUser,
  });
};

export const getProjects = () => {
  return db
    .collection("projects")
    .get()
    .then((querySnapshot) => {
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, data: doc.data() });
      });
      return projects;
    });
};

export const newTemplate = (
  name,
  description,
  date,
  currentUser,
  projectId
) => {
  return db.collection("templates").add({
    name,
    description,
    date,
    currentUser,
    projectId,
  });
};

export const newCompany = (
  companyName,
  companyAdress,
  companyVAT,
  companyIBAN,
  currentUser,
  companyInvoiceNo
) => {
  return db.collection("companyInfo").add({
    companyName,
    companyAdress,
    companyVAT,
    companyIBAN,
    currentUser,
    companyInvoiceNo,
  });
};

export const newVendor = (
  vendorName,
  vendorAdress,
  vendorVAT,
  vendorEmail,
  currentUser
) => {
  return db.collection("vendors").add({
    vendorName,
    vendorAdress,
    vendorVAT,
    vendorEmail,
    currentUser,
  });
};

export const newProduct = (
  productName,
  productDescription,
  productPrice,
  productStock,
  currentUser
) => {
  return db.collection("products").add({
    productName,
    productDescription,
    productPrice,
    productStock,
    currentUser,
  });
};

export const getProducts = () => {
  return db.collection("products").get();
};

export const getVendors = () => {
  return db.collection("vendors").get();
};

export const updateVendor = async (vendorId, name, adress, VAT, email) => {
  db.collection("vendors").doc(vendorId).set({
    vendorName: name,
    vendorAdress: adress,
    vendorVAT: VAT,
    vendorEmail: email,
    currentUser: currentUser,
  });
};

export const updateProduct = async (
  productId,
  name,
  description,
  price,
  stock
) => {
  db.collection("products").doc(productId).set({
    productName: name,
    productDescription: description,
    productPrice: price,
    productStock: stock,
    currentUser: currentUser,
  });
};

export const getCompanyInfo = () => {
  return db.collection("companyInfo").get();
};

export const updateCompanyInfo = async (
  companyId,
  name,
  adress,
  VAT,
  IBAN,
  currentUser,
  companyInvoiceNo
) => {
  db.collection("companyInfo").doc(companyId).set({
    companyName: name,
    companyAdress: adress,
    companyVAT: VAT,
    companyIBAN: IBAN,
    currentUser: currentUser,
    companyInvoiceNo: companyInvoiceNo,
  });
};

export const updateCompanyInvoiceNo = async (companyId, companyInvoiceNo) => {
  db.collection("companyInfo").doc(companyId).set({
    companyInvoiceNo: companyInvoiceNo,
    currentUser: currentUser,
  });
};

export const getTemplates = () => {
  return db
    .collection("templates")
    .get()
    .then((querySnapshot) => {
      const templates = [];
      querySnapshot.forEach((doc) => {
        templates.push({ id: doc.id, data: doc.data() });
      });
      return templates;
    });
};

export const editProjectData = async (
  projectId,
  today,
  newName,
  newDescription
) => {
  db.collection("projects").doc(projectId).set({
    name: newName,
    description: newDescription,
    date: today,
    currentUser: currentUser,
  });
};

export const editTemplateData = async (
  templateId,
  today,
  newName,
  newDescription,
  projectId
) => {
  db.collection("templates").doc(templateId).set({
    name: newName,
    description: newDescription,
    date: today,
    currentUser: currentUser,
    projectId: projectId,
  });
};

export const modifyTemplateContent = async (templateId, templateContent) => {
  db.collection("templates")
    .doc(templateId)
    .set({ content: templateContent }, { merge: true });
};

export const deleteProjectDB = async (projectId) => {
  db.collection("projects").doc(projectId).delete();
};

export const deleteTemplateDB = async (templateId) => {
  db.collection("templates").doc(templateId).delete();
};

export const deleteVendorData = async (vendorId) => {
  db.collection("vendors").doc(vendorId).delete();
};

export const deleteProductData = async (productId) => {
  db.collection("products").doc(productId).delete();
};
