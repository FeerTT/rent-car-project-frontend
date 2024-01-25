import React from "react";
import ICustomer from "../../entities/ICustomer";
import { Link } from "react-router-dom";
interface CustomerTableProps {
  customers: any[];
  onDelete: (customerId: number) => void;
  onModify: (customer: ICustomer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers = [],
  onDelete,
  onModify,
}) => {
  return (
    <table className="table is-bordered is-fullwidth is-hoverable is-striped is-narrow">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Document Type</th>
          <th>Document Number</th>
          <th>Address</th>
          <th>Nationality</th>
          <th>Birth Date</th>
          <th>Created At</th>
          {/* <th>Updated At</th> */}
        </tr>
      </thead>
      <tbody>
        {customers &&
          customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <Link to={`/customers/${customer.id}`}>{customer.id}</Link>
              </td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.documentType}</td>
              <td>{customer.documentNumber}</td>
              <td>{customer.address}</td>
              <td>{customer.nationality}</td>
              <td>{customer.birthDate}</td>
              <td>
                {customer.createdAt ? customer.createdAt.substring(0, 16) : ""}
              </td>
              {/* <td>
                  {customer.updatedAt ? customer.updatedAt.substring(0, 16) : ""}
                </td> */}
              <td>
                <button
                  className="button is-danger is-small"
                  onClick={() => onDelete(customer.id)}
                >
                  Delete
                </button>
                <button
                  className="button is-warning is-small"
                  onClick={() => onModify(customer)}
                >
                  Modify
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
