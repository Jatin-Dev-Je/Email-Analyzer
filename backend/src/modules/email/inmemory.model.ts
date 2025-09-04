export type PlainDoc = Record<string, any>

export class InMemoryEmailLogModel {
  static store: PlainDoc[] = []

  // Simulate mongoose timestamps on save
  createdAt?: Date
  updatedAt?: Date

  constructor(data?: PlainDoc) {
    if (data) Object.assign(this, data)
  }

  async save() {
    const now = new Date()
    this.createdAt = this.createdAt || now
    this.updatedAt = now
    // push a plain copy
    InMemoryEmailLogModel.store.push(JSON.parse(JSON.stringify(this)))
    return this
  }

  static async countDocuments() {
    return InMemoryEmailLogModel.store.length
  }

  static findOne() {
    return {
      sort(_criteria: any) {
        return {
          lean: async () => {
            const arr = [...InMemoryEmailLogModel.store]
            // naive sort by createdAt desc
            arr.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
            return arr[0] || null
          },
        }
      },
    }
  }
}
