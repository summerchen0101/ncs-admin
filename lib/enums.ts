export enum Protocal {
  Http = 'http://',
  Https = 'https://',
}
export enum Status {
  ON = 1,
  OFF = 2,
}

export enum Device {
  PC = 1,
  Mobile = 2,
}
export enum IPBlockType {
  White = 1,
  Black = 2,
}

export enum ProcessStatus {
  Processing = 1,
  Done = 2,
  Canceled = 3,
}

export enum UsdtType {
  TRC20 = 1,
  ERC20 = 2,
  OMNI = 3,
}

export enum WalletType {
  USDT = 1,
  Balance = 2,
}

export enum BlockStatus {
  Normal = 1, // 正常
  Blocked = 2, // 鎖定
}

export enum IssueStatus {
  Processing = 1,
  Readed = 2,
  Finished = 3,
}
export enum IssueType {
  Game = 1,
  Trade = 2,
  Team = 3,
  User = 4,
  Other = 5,
}

export enum NewsType {
  Marquee = 1,
  System = 2,
  Game = 3,
  Activity = 4,
}

export enum MemberType {
  Member = 1,
  Agent = 2,
}
