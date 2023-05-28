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