import IRent from "../../entities/IRent";

interface RentTableRowProps {
  rents: IRent[];
  onModify: (rent: IRent) => void;
  onDelete: (rentId: number) => void;
}

const RentTableRow: React.FC<RentTableRowProps> = ({
  rents,
  onModify,
  onDelete,
}) => {
  const handleModify = (rent: IRent) => {
    onModify(rent);
  };
  const handleRedirect = (path: string) => {
    window.location.href = `http://localhost:3000${path}`;
  };
  return (
    <div className="table-container" style={{ overflowX: "auto" }}>
      <table className="table is-bordered is-fullwidth is-hoverable is-striped is-narrow">
        <thead>
          <tr>
            <th>Rent ID</th>
            <th>Car ID</th>
            <th>Customer ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Price</th>
            <th>Unit Price</th>
            <th>Is Paid</th>
            <th>Payment Method</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rents.map((rent) => (
            <tr key={rent.id}>
              <td
                data-testid={`rent-id-${rent.id}`}
                className="data-cell has-text-info is-clickable"
                onClick={() => handleRedirect(`/rents/${rent.id}`)}
              >
                {rent.id}
              </td>
              <td
                className="data-cell has-text-info is-clickable"
                onClick={() => handleRedirect(`/cars/${rent.carId}`)}
              >
                {rent.carId}
              </td>
              <td
                className="data-cell has-text-info is-clickable"
                onClick={() => handleRedirect(`/customers/${rent.customerId}`)}
              >
                {rent.customerId}
              </td>
              <td className="data-cell">
                {rent.startDate ? rent.startDate?.slice(0, 10) : ""}
              </td>
              <td className="data-cell">
                {rent.endDate ? rent.endDate.slice(0, 10) : ""}
              </td>
              <td className="data-cell">{rent.totalPrice}</td>
              <td className="data-cell">{rent.unitPrice}</td>
              <td className="data-cell">{rent.isPaid ? "Yes" : "No"}</td>
              <td className="data-cell">{rent.paymentMethod}</td>
              <td className="data-cell">
                {rent.createdAt ? rent.createdAt.slice(0, 16) : ""}
              </td>

              <td>
                <button
                  className="button is-danger is-small"
                  onClick={() => onDelete(rent.id as any)}
                >
                  Delete
                </button>
                <button
                  className="button is-warning is-small"
                  onClick={() => handleModify(rent)}
                >
                  Modify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentTableRow;
