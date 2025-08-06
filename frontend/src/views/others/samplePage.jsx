import React from "react";
import { useParams } from "react-router-dom";

function SamplePage() {
  // Extract 'name' parameter from the route
  const { name } = useParams();

  return (
    <div>
      <h1>Welcome to {name}'s Page</h1>
      <p>This page is dynamically generated based on the route parameter.</p>
      {/* You can further customize this page based on the 'name' */}
    </div>
  );
}

export default SamplePage;
