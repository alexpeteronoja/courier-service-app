import mongoose from 'mongoose';
import { trackingCode } from '../utils/trackingCode.js';

const trackingEventSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: [
        'pending',
        'picked_up',
        'in_transit',
        'at_hub',
        'out_for_delivery',
        'delivered',
        'failed_delivery',
        'returned',
        'customs_hold',
        'exception',
      ],
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    location: {
      type: String,
      required: [true, 'Event Location is required'],
      trim: true,
      maxlength: [300, 'Location cannot exceed 300 characters'],
      // city: { type: String, trim: true },
      // state: { type: String, trim: true },
      // country: { type: String, trim: true, default: 'Nigeria' },
      // facility: { type: String, trim: true }, // e.g. "Lagos Sorting Hub"
      // coordinates: {
      //   lat: { type: Number },
      //   lng: { type: Number },
      // },
    },
    handler: {
      // Staff member who logged this event
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, trim: true },
      role: { type: String, trim: true },
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true },
);

// Shipping Schema

const shipmentSchema = new mongoose.Schema(
  {
    trackingCode: {
      type: String,
      // required: true,
      unique: true,
      index: true,
      uppercase: true,
    },

    // status

    status: {
      type: String,
      enum: [
        'pending',
        'picked_up',
        'in_transit',
        'at_hub',
        'out_for_delivery',
        'delivered',
        'failed_delivery',
        'returned',
        'customs_hold',
        'exception',
      ],
      default: 'pending',
    },

    // Senders Information

    senderName: {
      type: String,
      trim: true,
      required: [true, 'Please Enter Senders Full Name'],
    },

    senderPhoneNo: {
      type: String,
      trim: true,
      required: [true, 'Please Enter Senders Phone Number'],
    },

    senderAddress: {
      type: String,
      trim: true,
      required: [true, 'Please Enter Senders Address'],
    },
    // senderLocation: {
    //   type: String,
    //   trim: true,
    //   required: [true, 'Please Enter Senders Location'],
    // },

    // Recipient information

    recipientName: {
      type: String,
      trim: true,
      required: [true, 'Please Enter Recipient Full Name'],
    },

    recipientPhoneNo: {
      type: String,
      trim: true,
      required: [true, 'Please Enter Recipient Phone Number'],
    },

    recipientEmail: {
      type: String,
      trim: true,
    },

    recipientAddress: {
      type: String,
      trim: true,
      required: [true, 'Please Enter Recipient Address'],
    },

    // recipientLocation: {
    //   type: String,
    //   trim: true,
    //   required: [true, 'Please Enter Recipient Location '],
    // },

    // Package Information

    packageDescription: {
      type: String,
      trim: true,
      required: [true, 'Please Enter a Package Description'],
    },

    weight: Number,

    category: {
      type: String,
      enum: [
        'Document',
        'Electronics',
        'Clothing',
        'Food',
        'Fragile',
        'General',
        'Other',
      ],
      default: 'General',
    },

    // Shipping Status

    currentStatus: {
      type: String,
      enum: [
        'Shipment Created',
        'Awaiting Pickup',
        'Picked Up',
        'In Transit',
        'Arrived at Hub',
        'Out for Delivery',
        'Delivered',
        'Failed Delivery',
        'Returned to Sender',
        'On Hold',
      ],
      default: 'Shipment Created',
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    events: { type: [trackingEventSchema], default: [] },

    estimatedDelivery: Date,
    actualDelivery: { type: Date },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Generate Tracking Code

shipmentSchema.pre('save', async function () {
  if (this.trackingCode) return;

  let retries = 0;
  const maxRetries = 10;

  while (retries < maxRetries) {
    const code = trackingCode();
    // eslint-disable-next-line no-await-in-loop
    const exist = await mongoose
      .model('Shipment')
      .exists({ trackingCode: code });

    if (!exist) {
      this.trackingCode = code;
      return;
    }
    // eslint-disable-next-line no-plusplus
    retries++;
    console.log(code);
  }

  throw new Error(
    `Failed to generate unique tracking code after ${maxRetries} attempts`,
  );
});

// hide deleted item

shipmentSchema.pre(/^find/, function () {
  this.find({ isArchived: { $ne: true } });
});

shipmentSchema.index({ trackingCode: 1, createdAt: -1 });

const Shipment = mongoose.model('Shipment', shipmentSchema);

export { Shipment };
