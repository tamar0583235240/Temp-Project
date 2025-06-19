// tipsStyles.ts - זמני
import React from "react";

export const popupContainerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "90px",
  right: "24px",
  zIndex: 1000,
  animation: "fadeInUp 0.4s ease forwards",
};

export const popupStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
  borderRadius: "16px",
  padding: "18px 22px",
  maxWidth: "300px",
  width: "100%",
  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
  position: "relative",
  fontFamily: "'Segoe UI', Tahoma, sans-serif",
  color: "#0d47a1",
  whiteSpace: "pre-wrap",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

export const textStyle: React.CSSProperties = {
  fontSize: "15px",
  margin: 0,
  lineHeight: 1.5,
  flex: 1,
};

export const closeButtonStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  fontSize: "18px",
  color: "#1565c0",
  cursor: "pointer",
  position: "absolute",
  top: "8px",
  right: "10px",
};

export const controlsContainerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "20px",
  right: "24px",
};

export const buttonStyle: React.CSSProperties = {
  backgroundColor: "#64b5f6",
  border: "none",
  borderRadius: "8px",
  padding: "6px 14px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
  color: "white",
  boxShadow: "0 4px 12px rgba(100, 181, 246, 0.5)",
  transition: "background-color 0.3s ease",
};

export const loaderContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

export const spinnerStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  border: "5px solid #e3f2fd",
  borderTop: "5px solid #64b5f6",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};
