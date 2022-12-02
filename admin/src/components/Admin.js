import React, { useState } from "react";
import FormikForm from "./adminForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/admin.css";

function Admin() {
  const [fields, updateFields] = useState({
    subject: "Shingles",
    question: "How many vaccines are available?",
    answer: "2",
  });

  return (
    <div className="container">
      <FormikForm fields={fields} updateFields={updateFields} />
    </div>
  );
}

export default Admin;
