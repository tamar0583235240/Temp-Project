import React from "react";

export const buttonsContainerStyle: React.CSSProperties = {
  fontFamily: '"Segoe UI", sans-serif',
  backgroundColor: "#f3f7fa",
  padding: "2rem",
  maxWidth: "700px",
  margin: "0 auto",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  direction: "rtl",
};

export const questionCardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "1.5rem",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
};

export const questionTitleStyle: React.CSSProperties = {
  color: "#005c99",
  fontSize: "1.5rem",
  marginBottom: "1rem",
};

export const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
};

export const buttonStyle: React.CSSProperties = {
  backgroundColor: "#007acc",
  color: "#fff",
  border: "none",
  padding: "0.6rem 1.2rem",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s",
};

export const buttonDisabledStyle: React.CSSProperties = {
  backgroundColor: "#ccc",
  cursor: "not-allowed",
};

export const buttonHoverStyle: React.CSSProperties = {
  backgroundColor: "#005f9e",
};

export const endBtnStyle: React.CSSProperties = {
  marginTop: "1rem",
  width: "100%",
  backgroundColor: "#007acc",
  color: "#fff",
  border: "none",
  padding: "0.6rem 1.2rem",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s",
};

export const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

export const modalContentStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "400px",
  textAlign: "center",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
  position: "relative",
};

export const closeBtnStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  fontSize: "1.5rem",
  position: "absolute",
  top: "1rem",
  left: "1rem",
  cursor: "pointer",
  color: "#666",
};