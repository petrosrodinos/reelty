import { RoomTypes, type RoomType } from "@/features/images/interfaces/images.interfaces";

export const RoomTypeFormOptions: { id: RoomType; label: string }[] = [
  { id: RoomTypes.AUTO, label: "Auto" },
  { id: RoomTypes.EXTERIOR, label: "Exterior" },
  { id: RoomTypes.LIVING_ROOM, label: "Living room" },
  { id: RoomTypes.KITCHEN, label: "Kitchen" },
  { id: RoomTypes.BEDROOM, label: "Bedroom" },
  { id: RoomTypes.BATHROOM, label: "Bathroom" },
  { id: RoomTypes.TERRACE_VIEW, label: "Terrace / View" },
  { id: RoomTypes.OTHER, label: "Other" },
];
