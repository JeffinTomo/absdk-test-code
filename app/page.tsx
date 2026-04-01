"use client";

import React, { lazy, Suspense } from "react";

const ClientComponent = lazy(() => import("../components/ClientComponent"));

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientComponent />
      </Suspense>
    </div>
  );
};