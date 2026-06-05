import { useState } from "react";
import CreateShipment from "../../components/shipment/CreateShipment";
import ShipmentPage from "../../components/shipment/ShipmentPage";

function Shipment() {
  //   const { showCreateShipment, setShowCreateShipment } = useState(false);

  const [openCreateShipment, setOpenCreateShipment] = useState(false);

  return (
    <>
      {!openCreateShipment ? (
        <ShipmentPage setOpenCreateShipment={setOpenCreateShipment} />
      ) : (
        <CreateShipment
          openCreateShipment={openCreateShipment}
          setOpenCreateShipment={setOpenCreateShipment}
        />
      )}
    </>
  );
}

export default Shipment;
