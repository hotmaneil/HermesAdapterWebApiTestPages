/**
 * LockinputStatus 列舉
 */
export enum LockinputStatusEnum {
  CommandUndefined = 'Command undefined',
  LockInputConveyor = 'Lock input conveyor',
  UnlockInputConveyor = 'Unlock input conveyor',
  RequestPause = 'Request pause',
  ConfirmPause = 'Confirm pause',
  ResumeOperation = 'Resume operation',
  ReservedForFutureUse = 'reserved for future use',
  CustomerDefinedCommands = 'customer defined commands'
}

/**
 * 表單模式 列舉
 */
export enum FormModeEnum {
  /**
   * 新增
   */
  New = 'New',

  /**
   * 修改
   */
  Modify = 'Modify'
}

/**
 * 角色 列舉
 */
export enum RoleEnum {
  /** 管理員 */
  Administrator = 'Administrator',

  /** 工程師 */
  Engineer = 'Engineer',

  /** 一般使用者 */
  User = 'User',

  /** 超級管理員 */
  SuperAdministrator = 'SuperAdministrator'
}

/**
 * 類別選擇 列舉
 */
export enum TypeEnum {
  /** 板寬 */
  Width = 'Width',

  /** 配方名稱 */
  RecipeName = 'RecipeName',

  /** 兩者皆有 */
  Both = 'Both'
}

/**
 * 對話框狀態 列舉
 */
export enum ModalStatusEnum {
  /** 尚未有詢問通知 */
  NoAsk = 0,

  /** 詢問通知中 */
  Asking = 1
}

/**
 * 進板 出板 列舉
 */
export enum ArrivedOrDepartedEnum {
  Arrived = 0,
  Departed = 1
}

/**
 * 經常讀取參數 列舉
 */
export enum AlwaysReadParamEnum {
  /** 設定_Hermes已變更 */
  HermesChange = 'HermesChange',

  /** 設定Digatal IO已變更 */
  DIOChange = 'DIOChange',

  /** 設定_Outports已變更 */
  OutportsChange = 'OutportsChange'
}

/**
 * 詢問類型 列舉
 */
export enum AskedEnum {
  /** QB，為QueryBoard之縮寫 */
  QB = 'QB',

  /** Keyin，為QueryWorkOrder */
  Keyin = 'Keyin'
}

/**
 * 佈景主題 列舉
 */
export enum ThemeModeEnum {
  Light = 'light',
  Dark = 'dark'
}
