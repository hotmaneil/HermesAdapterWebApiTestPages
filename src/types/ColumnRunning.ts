/**
 * 元件專用-顯示上下游及上位狀態
 */
export type ColumnRunning = {
  Lockinput: number
  LockinputClass: string
  Lockinput_Status: string

  Supervisory: string
  Supervisory_Status: string
  SupervisoryClass: string

  Upstream: string
  Upstream_Status: string
  UpstreamClass: string

  Downstream: string
  Downstream_Status: string
  DownstreamClass: string
}
