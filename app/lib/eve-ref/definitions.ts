export type Skill = {
  base_price: number;
  description: Description;
  group_id: number;
  icon_id: number;
  market_group_id: number;
  name: Description;
  portion_size: number;
  published: boolean;
  volume: number;
  type_id: number;
  capacity: number;
  dogma_attributes: { [key: string]: DogmaAttribute };
  dogma_effects: { [key: string]: DogmaEffect };
  mass: number;
  packaged_volume: number;
  radius: number;
  is_skill: boolean;
  required_skills: RequiredSkills;
};

export type Description = {
  de: string;
  en: string;
  es: string;
  fr: string;
  ja: string;
  ko: string;
  ru: string;
  zh: string;
};

export type DogmaAttribute = {
  attribute_id: number;
  value: number;
};

export type DogmaEffect = {
  effect_id: number;
  is_default: boolean;
};

export type RequiredSkills = {
  [key: string]: number;
};
