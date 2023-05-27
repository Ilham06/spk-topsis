export interface AlternativeType {
  id: string;
  code: string;
  name: string;
  note?: string;
}

export interface CriteriaType {
  id: string;
  code: string;
  name: string;
  note?: string;
  weight: number;
  attribute: string;
}