import { RoomTypes, type RoomType } from "@/features/images/interfaces/images.interfaces";

export const RoomTypeFormOptions: { id: RoomType; label: string }[] = [
  { id: RoomTypes.AUTO, label: "Auto" },
  { id: RoomTypes.EXTERIOR, label: "Exterior" },
  { id: RoomTypes.LIVING_ROOM, label: "Living room" },
  { id: RoomTypes.DINING_ROOM, label: "Dining room" },
  { id: RoomTypes.KITCHEN, label: "Kitchen" },
  { id: RoomTypes.BEDROOM, label: "Bedroom" },
  { id: RoomTypes.BATHROOM, label: "Bathroom" },
  { id: RoomTypes.OFFICE, label: "Office" },
  { id: RoomTypes.POOL, label: "Pool" },
  { id: RoomTypes.GARDEN, label: "Garden" },
  { id: RoomTypes.TERRACE_VIEW, label: "Terrace / View" },
  { id: RoomTypes.BALCONY, label: "Balcony" },
  { id: RoomTypes.OUTDOOR_DINING, label: "Outdoor dining" },
  { id: RoomTypes.BEACH_SEA, label: "Beach / Sea" },
  { id: RoomTypes.OTHER, label: "Other" },
];
