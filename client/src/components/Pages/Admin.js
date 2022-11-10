import React, { useState } from "react";
import FormikForm from "../form/adminForm";
import '../styles/admin.css'

function Admin() {
  const [fields, updateFields] = useState({
    Subject: "Addition",
    Question: "1+1",
    Answer: "2",
  });

  return (
    <div className="admin">
      <FormikForm fields={fields} updateFields={updateFields} />
    </div>
  );
}

export default Admin;
