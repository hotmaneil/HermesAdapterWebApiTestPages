import type { UpdateParam } from '@/types/Setting/UpdateParam'

/**
 * 更新設定之資料列表與操作使用者
 */
export type UpdateParamUser = {
  InputList: UpdateParam[]
  Operator: string | undefined
}
