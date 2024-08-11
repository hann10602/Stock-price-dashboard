export type TSocketResponse = {
  data: TBinanceCoin;
  type: string;
};

export type TBinanceCoin = {
  p: number;
  s: string;
  t: number;
  v: number;
};
