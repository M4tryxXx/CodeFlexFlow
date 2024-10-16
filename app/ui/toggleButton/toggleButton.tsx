"use client";
import React, { useState } from "react";

export default function ToggleButton({ toggleState }: any) {
  return (
    <div>
      <button
        onClick={() => {
          toggleState = !toggleState;
        }}
      >
        {toggleState ? "Show Conatct Me" : "Hide Contact me"}
      </button>
    </div>
  );
}
