export interface Product {
  id: number;
  name: string;
  blend: string;
  description: string;
  image: string;
  accentColor: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}
