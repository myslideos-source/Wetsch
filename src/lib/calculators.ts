// Rechenlogik für die interaktiven Rechner.
// Dichten sind allgemeine bautechnische Richtwerte (Schüttdichte, lose),
// Preise sind konfigurierbare Orientierungswerte und keine verbindlichen
// Wetsch-Preise – siehe Disclaimer in den jeweiligen Komponenten.

export interface MaterialType {
  id: string;
  label: string;
  /** Schüttdichte in Tonnen pro m³ (Richtwert, lose Schüttung) */
  density: number;
  description: string;
}

export const MATERIAL_TYPES: MaterialType[] = [
  { id: "schotter", label: "Schotter", density: 1.8, description: "32–56 mm, Tragschicht" },
  { id: "frostschutz", label: "Frostschutz", density: 1.9, description: "0–32 mm, Frostschutzschicht" },
  { id: "splitt", label: "Splitt", density: 1.5, description: "2–5 mm, Bettung" },
  { id: "kies", label: "Kies", density: 1.6, description: "Rundkorn, Drainage" },
  { id: "sand", label: "Sand", description: "0–2 mm, Bettung & Fugen", density: 1.5 },
  { id: "mutterboden", label: "Mutterboden", density: 1.3, description: "Oberboden, Bepflanzung" },
];

/** Ladekapazität eines LKW in Tonnen (Richtwert). */
export const TRUCK_CAPACITY_TONS = 24;

export interface MaterialResult {
  volumeM3: number;
  weightTons: number;
  truckloads: number;
}

export function calculateMaterial(
  areaM2: number,
  heightCm: number,
  materialId: string
): MaterialResult | null {
  const material = MATERIAL_TYPES.find((m) => m.id === materialId);
  if (!material || areaM2 <= 0 || heightCm <= 0) return null;

  const volumeM3 = areaM2 * (heightCm / 100);
  const weightTons = volumeM3 * material.density;
  const truckloads = Math.max(1, Math.ceil(weightTons / TRUCK_CAPACITY_TONS));

  return {
    volumeM3: Math.round(volumeM3 * 10) / 10,
    weightTons: Math.round(weightTons * 10) / 10,
    truckloads,
  };
}

export interface PavingMaterial {
  id: string;
  label: string;
  /** Orientierungspreis pro m² inkl. einfachem Unterbau, in Euro (Richtwert) */
  pricePerM2Min: number;
  pricePerM2Max: number;
}

export const PAVING_MATERIALS: PavingMaterial[] = [
  { id: "betonpflaster", label: "Betonpflaster", pricePerM2Min: 60, pricePerM2Max: 90 },
  { id: "naturstein", label: "Naturstein", pricePerM2Min: 95, pricePerM2Max: 145 },
  { id: "klinker", label: "Klinker", pricePerM2Min: 80, pricePerM2Max: 120 },
];

export interface PavingOption {
  id: string;
  label: string;
  /** Aufpreis pro m² in Euro (Richtwert) */
  extraPerM2: number;
}

export const PAVING_OPTIONS: PavingOption[] = [
  { id: "unterbau", label: "Verstärkter Unterbau", extraPerM2: 12 },
  { id: "entwaesserung", label: "Entwässerung", extraPerM2: 18 },
  { id: "randsteine", label: "Randsteine", extraPerM2: 8 },
  { id: "aushub", label: "Aushub & Abtransport", extraPerM2: 14 },
];

export interface PavingResult {
  min: number;
  max: number;
}

export function calculatePaving(
  areaM2: number,
  materialId: string,
  optionIds: string[]
): PavingResult | null {
  const material = PAVING_MATERIALS.find((m) => m.id === materialId);
  if (!material || areaM2 <= 0) return null;

  const extra = optionIds.reduce((sum, id) => {
    const opt = PAVING_OPTIONS.find((o) => o.id === id);
    return sum + (opt ? opt.extraPerM2 : 0);
  }, 0);

  const min = areaM2 * (material.pricePerM2Min + extra);
  const max = areaM2 * (material.pricePerM2Max + extra);

  return {
    min: Math.round(min / 10) * 10,
    max: Math.round(max / 10) * 10,
  };
}

export interface WasteMaterial {
  id: string;
  label: string;
  /** Dichte in Tonnen pro m³ (Richtwert) */
  density: number;
}

export const WASTE_MATERIALS: WasteMaterial[] = [
  { id: "bauschutt", label: "Bauschutt", density: 1.5 },
  { id: "beton", label: "Beton", density: 2.2 },
  { id: "ziegel", label: "Ziegel", density: 1.4 },
  { id: "erde", label: "Erde", density: 1.8 },
  { id: "mischabfall", label: "Mischabfall", density: 1.0 },
];

export interface ContainerSize {
  m3: number;
  /** Orientierungspreis in Euro (Richtwert, materialabhängig) */
  basePrice: number;
}

export const CONTAINER_SIZES: ContainerSize[] = [
  { m3: 5, basePrice: 320 },
  { m3: 7, basePrice: 420 },
  { m3: 10, basePrice: 560 },
];

export interface WasteResult {
  volumeM3: number;
  weightTons: number;
  container: ContainerSize;
  estimatedCostMin: number;
  estimatedCostMax: number;
}

export function calculateWaste(volumeM3: number, materialId: string): WasteResult | null {
  const material = WASTE_MATERIALS.find((m) => m.id === materialId);
  if (!material || volumeM3 <= 0) return null;

  const weightTons = volumeM3 * material.density;
  const container =
    CONTAINER_SIZES.find((c) => c.m3 >= volumeM3) ??
    CONTAINER_SIZES[CONTAINER_SIZES.length - 1];

  const weightFactor = material.density / 1.5;
  const estimatedCostMin = Math.round((container.basePrice * weightFactor * 0.9) / 10) * 10;
  const estimatedCostMax = Math.round((container.basePrice * weightFactor * 1.25) / 10) * 10;

  return {
    volumeM3: Math.round(volumeM3 * 10) / 10,
    weightTons: Math.round(weightTons * 10) / 10,
    container,
    estimatedCostMin,
    estimatedCostMax,
  };
}
