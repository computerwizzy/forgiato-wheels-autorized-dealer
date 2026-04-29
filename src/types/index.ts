export interface WheelDetail {
  images: string[];
  specs: {
    construction?: string;
    material?: string;
    sizes?: string;
    boltPattern?: string;
    finish?: string;
    madeIn?: string;
  };
  description?: string;
  gallery: string[];
}

export interface Wheel {
  name: string;
  series: string;
  imageUrl: string;
  slug: string;
  detail?: WheelDetail;
}

export interface QuoteFormData {
  wheelName: string;
  wheelImageUrl: string;
  name: string;
  email: string;
  phone: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  sizePreference: string;
  finishPreference: string;
  message: string;
}
