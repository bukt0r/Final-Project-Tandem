export interface Topic {
  readonly id: string
  readonly title: string
  readonly description?: string
}

export const createTopic = (params: Topic): Topic => params
