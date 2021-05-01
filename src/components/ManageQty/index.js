import { useState } from "react";
import { Button } from "reactstrap";

const ManageQty = ({ prix }) => {
  const [command, setCommand] = useState({
    qty: 1,
    pt: prix,
  });

  const onChange = (e) => {
    const { value } = e.target;
    setCommand({
      qty: value,
      pt: value * prix,
    });
  };

  return (
    <div className="mt-5 w-100 d-flex flex-row align-items-center justify-content-between">
      <div>
        <label>Quantité :</label>
        <select
          onChange={onChange}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            marginLeft: "10px",
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <p>Coût total : {command.pt} €</p>
      </div>
      <Button>Acheter</Button>
    </div>
  );
};

export default ManageQty;
