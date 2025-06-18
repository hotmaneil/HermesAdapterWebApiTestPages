/**
 * 元件專用-顯示上下游之BR與MR狀態
 */
export type ColumnRunningBRMR = {
  Upstream_BoardAvailable: string
  UpstreamBoardAvailableClass: string

  Upstream_MachineReady: string
  UpstreamMachineReadyClass: string

  Upstream_FailedBoardAvailable: string
  UpstreamFailedBoardAvailableClass: string

  Downstream_BoardAvailable: string
  DownstreamBoardAvailableClass: string

  Downstream_MachineReady: string
  DownstreamMachineReadyClass: string

  Downstream_FailedBoardAvailable: string
  DownstreamFailedBoardAvailableClass: string
}
