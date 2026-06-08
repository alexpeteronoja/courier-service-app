import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useUpdateShipment } from "../../datahooks/shipment/shipmentHook";
import { notifyError, notifySuccess } from "../../utils/toast";
import axios from "axios";
import { useEditShipmentStore } from "../../zustandStores/openModalStore";
import { useEffect } from "react";
import type { ShipmentFormDataTypes } from "./shipmentTypes";

function EditShipment() {
  const { updateShipmentMutateAsync, updateShipmentPending } =
    useUpdateShipment();
  const { closeEditShipmentStore, editShipmentStore } = useEditShipmentStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
    reset,
  } = useForm<ShipmentFormDataTypes>({
    defaultValues: {
      category: "General",
    },
  });

  useEffect(() => {
    if (editShipmentStore) {
      reset({
        senderName: editShipmentStore.senderName,
        senderPhoneNo: editShipmentStore.senderPhoneNo,
        senderAddress: editShipmentStore.senderAddress,

        recipientName: editShipmentStore.recipientName,
        recipientPhoneNo: editShipmentStore.recipientPhoneNo,
        recipientEmail: editShipmentStore.recipientEmail,
        recipientAddress: editShipmentStore.recipientAddress,

        packageDescription: editShipmentStore.packageDescription,
        weight: editShipmentStore.weight,
        category: editShipmentStore.category,
        estimatedDelivery: editShipmentStore.estimatedDelivery,
      });
    }
  }, [reset, editShipmentStore]);

  const onSubmit = async (data: ShipmentFormDataTypes) => {
    try {
      const updatedData = (
        Object.keys(dirtyFields) as (keyof ShipmentFormDataTypes)[]
      ).reduce<Partial<ShipmentFormDataTypes>>((acc, key) => {
        acc[key] = data[key] as never;
        return acc;
      }, {});

      await updateShipmentMutateAsync({
        shipmentId: editShipmentStore?._id,
        data: updatedData,
      });

      notifySuccess("Shipment Added Succesfully");

      reset();

      closeEditShipmentStore();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notifyError(err.response?.data?.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      {/* Modal */}
      {editShipmentStore && (
        <div className="pt-24 pb-10 ml-0 lg:ml-71 px-4 md:px-8.5 bg-background text-textcol min-h-dvh">
          <div className="bg-white w-full p-6 relative rounded-md">
            {/* Close Button */}
            <button
              onClick={closeEditShipmentStore}
              className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-semibold mb-6">Edit Shipment</h2>

            {/* Form Details */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* ================= SENDER ================= */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Sender Information
                </h3>

                <input
                  {...register("senderName", { required: true })}
                  placeholder="Sender Full Name"
                  className="input"
                />

                <input
                  {...register("senderPhoneNo", { required: true })}
                  placeholder="Sender Phone Number"
                  className="input mt-3"
                />

                <input
                  {...register("senderAddress")}
                  placeholder="Sender Address"
                  className="input mt-3"
                />
              </div>

              {/* ================= RECIPIENT ================= */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Recipient Information
                </h3>

                <input
                  {...register("recipientName", { required: true })}
                  placeholder="Recipient Full Name"
                  className="input"
                />

                <input
                  {...register("recipientPhoneNo", { required: true })}
                  placeholder="Recipient Phone Number"
                  className="input mt-3"
                />

                <input
                  {...register("recipientEmail")}
                  placeholder="Recipient Email"
                  className="input mt-3"
                />

                <input
                  {...register("recipientAddress", { required: true })}
                  placeholder="Recipient Address"
                  className="input mt-3"
                />
              </div>

              {/* ================= PACKAGE ================= */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Package Information
                </h3>

                <textarea
                  {...register("packageDescription", { required: true })}
                  placeholder="Package description"
                  className="input"
                />

                <input
                  type="number"
                  {...register("weight", { valueAsNumber: true })}
                  placeholder="Weight (kg)"
                  className="input mt-3"
                />

                <select {...register("category")} className="input mt-3">
                  <option value="General">General</option>
                  <option value="Document">Document</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Food">Food</option>
                  <option value="Fragile">Fragile</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* ================= DELIVERY ================= */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Delivery Timeline
                </h3>

                <input
                  type="date"
                  {...register("estimatedDelivery")}
                  className="input"
                />
              </div>

              {/* ================= BUTTONS ================= */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeEditShipmentStore}
                  className="border px-5 py-2 rounded-md cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-5 py-2 rounded-md flex justify-center items-center cursor-pointer"
                >
                  {updateShipmentPending ? (
                    <Loader2 className="animate-spin duration-300" />
                  ) : (
                    "Update Shipment"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditShipment;
