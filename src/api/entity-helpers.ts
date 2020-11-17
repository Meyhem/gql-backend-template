export interface Trackable {
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface Publishable {
  isPublished: boolean
  lastPublished?: Date
}
