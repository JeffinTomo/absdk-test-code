"use client";

function ClientComponent() {
  return (
    <div
      className=""
      onClick={async () => {
        const { initSDK } = await import("@ab-org/predicate-market-sdk");
        console.log("initSDK", { initSDK });
      }}
    >
      test
    </div>
  );
};

export default ClientComponent;
