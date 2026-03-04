export interface FoodItem {
  name: string;
  caloriesPerUnit: number; // For 100g or 100ml
  unit: string;
  description: string;
}

export const FOOD_LIST: FoodItem[] = [
  { name: 'Ayran', caloriesPerUnit: 38, unit: 'ml', description: '1 bardak (200ml) yaklaşık 76 cal' },
  { name: 'Tam Buğday Ekmeği', caloriesPerUnit: 250, unit: 'g', description: '1 dilim (25g) yaklaşık 65 cal' },
  { name: 'Yumurta (Haşlanmış)', caloriesPerUnit: 155, unit: 'g', description: '1 adet (50g) yaklaşık 78 cal' },
  { name: 'Beyaz Peynir', caloriesPerUnit: 310, unit: 'g', description: '1 dilim (30g) yaklaşık 93 cal' },
  { name: 'Zeytin (Siyah)', caloriesPerUnit: 115, unit: 'adet', description: '1 adet yaklaşık 5 cal' },
  { name: 'Ceviz', caloriesPerUnit: 654, unit: 'g', description: '1 tam ceviz yaklaşık 33 cal' },
  { name: 'Elma', caloriesPerUnit: 52, unit: 'g', description: '1 küçük boy (100g) yaklaşık 52 cal' },
  { name: 'Yoğurt (Tam Yağlı)', caloriesPerUnit: 61, unit: 'ml', description: '1 kase (200ml) yaklaşık 122 cal' },
  { name: 'Izgara Tavuk Göğsü', caloriesPerUnit: 165, unit: 'g', description: '100g pişmiş' },
  { name: 'Mercimek Çorbası', caloriesPerUnit: 45, unit: 'ml', description: '1 kepçe (150ml) yaklaşık 68 cal' },
];
