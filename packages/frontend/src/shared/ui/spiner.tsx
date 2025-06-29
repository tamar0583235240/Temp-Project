import React from "react";

export const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-dark border-solid"></div>
  </div>
);
Spinner.displayName = "Spinner";