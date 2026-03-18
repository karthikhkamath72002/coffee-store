export interface Product {
  id: number;
  name: string;
  blend: string;
  description: string;
  image: string;
  accentColor: string;

  // PDP extras (configurable via CSV)
  lifestyleImage1?: string;
  lifestyleImage2?: string;
  roast?: string;
  process?: string;
  size?: string;
  amazonLink?: string;
  flipkartLink?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}
