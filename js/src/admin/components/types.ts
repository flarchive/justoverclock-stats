export interface BaseStatAttributes {
  id: number;
  name: string;
  img: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseStat {
  type: 'base_stats';
  id: string | number;
  attributes: BaseStatAttributes;
}

export interface BaseStatsResponse {
  data: BaseStat[];
}

