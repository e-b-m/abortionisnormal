declare module 'leaflet' {
  export type LatLngLiteral = { lat: number; lng: number };
  export interface LeafletMouseEvent {
    latlng: LatLngLiteral;
  }
  export interface IconOptions {
    iconUrl?: string;
    iconRetinaUrl?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    popupAnchor?: [number, number];
    tooltipAnchor?: [number, number];
  }
  export class Icon<T extends IconOptions = IconOptions> {
    constructor(options?: T);
    static Default: Icon;
  }
  export function icon<T extends IconOptions = IconOptions>(options?: T): Icon<T>;
  const L: {
    Icon: typeof Icon;
    icon: typeof icon;
  };
  export default L;
}
