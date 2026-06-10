import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTrackingStores } from "../../zustandStores/openModalStore";
import { useAddTrackingEvent } from "../../datahooks/shipment/shipmentHook";
import { notifyError, notifySuccess } from "../../utils/toast";
import axios from "axios";
import type { AddTrackingFormData } from "./TrackingTypes";

function AddTracking() {
  const { closeAddTracking, isAddTrackingOpen, trackingDataStore } =
    useTrackingStores();

  const { addTrackingEventMutateAsync, addTrackingEventPending } =
    useAddTrackingEvent();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<AddTrackingFormData>({
    defaultValues: {
      status: "pending",
      category: "General",
    },
  });

  const onSubmit = async (data: AddTrackingFormData) => {
    try {
      await addTrackingEventMutateAsync({
        shipmentId: trackingDataStore?._id,
        data: {
          status: data.status,
          description: data.description,
          location: data.location,
        },
      });

      notifySuccess("Tracking Event Added");

      reset();
      closeAddTracking();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("my error", err.response);
        notifyError(err.response?.data?.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      {/* Modal */}
      {isAddTrackingOpen && (
        <div className="pt-24 pb-10 ml-0 lg:ml-71 px-4 md:px-8.5 bg-background text-textcol min-h-dvh">
          <div className="bg-white w-full p-6 relative rounded-md">
            {/* Close Button */}
            <button
              onClick={closeAddTracking}
              className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-semibold mb-6">Add Tracking Event</h2>

            {/* Form Details */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* ================= STATUS ================= */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Status</h3>

                <select
                  {...register("status", { required: true })}
                  className="input"
                >
                  <option value="pending">Pending</option>
                  <option value="picked_up">Picked Up</option>
                  <option value="in_transit">In Transit</option>
                  <option value="at_hub">At Hub</option>
                  <option value="out_for_delivery">Out For Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="failed_delivery">Failed Delivery</option>
                  <option value="returned">Returned</option>
                  <option value="customs_hold">Customs Hold</option>
                  <option value="exception">Exception</option>
                </select>
              </div>

              {/* ================= SENDER ================= */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Tracking Information
                </h3>

                <input
                  {...register("description", { required: true })}
                  placeholder="Description"
                  className="input"
                />

                <input
                  {...register("location", { required: true })}
                  placeholder="Location"
                  className="input mt-3"
                />

                {/* <input
                  {...register("senderAddress")}
                  placeholder="Sender Address"
                  className="input mt-3"
                /> */}
              </div>

              {/* ================= DELIVERY ================= */}
              {/* <div>
                <h3 className="text-lg font-semibold mb-3">
                  Delivery Timeline
                </h3>

                <input
                  type="date"
                  {...register("estimatedDelivery")}
                  className="input"
                />
              </div> */}

              {/* ================= BUTTONS ================= */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeAddTracking}
                  className="border px-5 py-2 rounded-md cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-5 py-2 rounded-md flex justify-center items-center cursor-pointer"
                >
                  {addTrackingEventPending ? (
                    <Loader2 className="animate-spin duration-300" />
                  ) : (
                    "Add Event"
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

export default AddTracking;
