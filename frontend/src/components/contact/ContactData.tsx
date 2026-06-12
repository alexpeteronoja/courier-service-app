import { Clock, Mail, MapPin, Package, Phone } from "lucide-react";
import type { ContactChannel, FAQ, ReachOption } from "./ContactTypes";

export const ChannelsData: ContactChannel[] = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+447448338490",
    sub: "Mon – Sat, 8 am – 8 pm WAT",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@swiftex.ng",
    sub: "We reply within 2 business hours",
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "14 Admiralty Way, Lekki Phase 1",
    sub: "Lagos, Nigeria",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat: 8 am – 8 pm",
    sub: "Sunday: 10 am – 4 pm WAT",
  },
];

export const ReachOptionsData: ReachOption[] = [
  {
    icon: Package,
    title: "Track a Shipment",
    desc: "Already have a tracking number? Jump straight to our tracking portal.",
    cta: "Track Now",
    accent: false,
    buttonLink: "/track-parcel",
  },
  //   {
  //     icon: MessageSquare,
  //     title: "Live Chat",
  //     desc: "Chat with a support agent in real time — fastest way to get answers.",
  //     cta: "Start Chat",
  //     accent: true,
  //     buttonLink: "",
  //   },
  //   {
  //     icon: HelpCircle,
  //     title: "Help Centre",
  //     desc: "Browse guides, FAQs, and tutorials to solve common questions yourself.",
  //     cta: "Browse Articles",
  //     accent: false,
  //     buttonLink: "",
  //   },
];

export const FaqsData: FAQ[] = [
  {
    q: "How do I track my package?",
    a: "Visit our Tracking page and enter your shipment ID. You'll get a real-time status update, including the current location and estimated delivery time.",
  },
  {
    q: "What items can I ship?",
    a: "We handle documents, parcels, business packages, and bulk deliveries. Restricted or prohibited items are not accepted.",
  },
  {
    q: "How much does shipping cost?",
    a: "Shipping costs vary based on package size, weight, destination, and delivery speed.",
  },
  {
    q: "How do I contact customer support?",
    a: "You can contact us through phone, email, or the contact form on our website.",
  },
];
