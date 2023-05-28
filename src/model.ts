export interface AlternativeType {
  id: string;
  code: string;
  name: string;
  note?: string;
  criterias?: AlternativeCriteriaType[];
}

export interface CriteriaType {
  id: string;
  code: string;
  name: string;
  note?: string;
  weight: number;
  attribute: string;
}

export interface AlternativeCriteriaType {
  alternative_code: string;
  criteria_code: string;
  value: number;
}

export interface DividerType {
  code: string;
  value: number;
}

export interface DistanceType {
  alternative_code: string;
  maxValue: number;
  minValue: number;
}

export interface PreferenceType {
  alternative_code: string;
  value: number;
}
export interface NormalizeType {
  alternative_code: string;
  criteria_code: string;
  value: number;
}
export interface IdealSolutionType {
  code: string;
  value: number;
}