import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

type TrackingFormData = {
  status: string;

  senderName: string;
  senderPhoneNo: string;
  senderAddress?: string;

  recipientName: string;
  recipientPhoneNo: string;
  recipientEmail?: string;
  recipientAddress: string;

  packageDescription: string;
  weight?: number;
  category: string;

  estimatedDelivery?: string;
};

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<TrackingFormData>({
    defaultValues: {
      status: "pending",
      category: "General",
    },
  });

  const onSubmit = async (data: TrackingFormData) => {
    try {
      console.log("FORM DATA:", data);

      // Example API call
      // await ApiInstance.post("/shipments", data);

      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="pt-24 pb-10 ml-0 lg:ml-71 px-4 md:px-8.5 bg-background text-textcol min-h-dvh">
        <div className="bg-white w-full p-6 relative rounded-md">
          <h2 className="text-2xl font-semibold mb-6">Add New Shipment</h2>

          {/* Form Details */}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* ================= STATUS ================= */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Shipment Status</h3>

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
              <h3 className="text-lg font-semibold mb-3">Sender Information</h3>

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
              <h3 className="text-lg font-semibold mb-3">Delivery Timeline</h3>

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
                className="border px-5 py-2 rounded-md cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-5 py-2 rounded-md flex justify-center items-center cursor-pointer"
              >
                {isSubmitting ? <Loader2 /> : "Create Shipment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
