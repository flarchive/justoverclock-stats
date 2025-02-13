

export interface BaseStat {
  id: number;
  name: string;
  img: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStatAttributes {
  id: number;
  userId: number;
  baseStatId: number;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserStatRelationship {
  baseStat: {
    data: {
      type: string;
      id: string;
    };
  };
}

export interface UserStat {
  type: "user_stats";
  id: string;
  attributes: UserStatAttributes;
  relationships: UserStatRelationship;
}

export interface ApiResponse {
  data: UserStat[];
  included: BaseStat[];
}

