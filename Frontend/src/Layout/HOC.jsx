/** @format */

import React, { useState } from "react";
import Navbar from "./Navbar";

const HOC = (Wcomponenet) => {
  return function Component() {
    return (
      <>
        <section
          className="flex overflow-x-hidden relative"
          style={{ backgroundColor: "#f2f3f8" }}
        >
          {/* Components & Navbar */}
          <div
            className={
                 " transition-all px-4 py-2  duration-150 flex-1  h-screen "
            }
            style={{ backgroundColor: "#f2f3f8",width:"80%" }}
          >
            <Navbar/>
            <div
              className="my-6 text-#000 h-[87%] wcomp"
              style={{ overflowY: "auto" }}
            >
              {" "}
              <Wcomponenet />
            </div>
          </div>
        </section>
      </>
    );
  };
};

export default HOC;
