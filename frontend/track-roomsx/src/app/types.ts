
export type BuildingModel = string;

export type FloorModel = string;

export interface RoomModel {
    key: string,
    building: string,
    floor: string
}

export interface BookingModel {
    id: number;
    createdAt: string;
    from: number; 
    to: number;   
    name: string;
}

export interface RoomBookingsModel {
    key: string;
    building: string;
    floor: string;
    bookings: BookingModel[];
}