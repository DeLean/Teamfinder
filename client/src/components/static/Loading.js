import React from "react";
import Loading from "./loading.gif";

export default () => {
  return (
    <div>
      <img
        src={Loading}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Lädt..."
      />
    </div>
  );
};
