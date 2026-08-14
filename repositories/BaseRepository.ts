import { Model } from "mongoose";
import type { UpdateQuery } from "mongoose";

export abstract class BaseRepository<TSchema> {
  constructor(
    protected readonly model: Model<TSchema>
  ) {}

  async create(data: Partial<TSchema>) {
    return this.model.create(data);
  }

  async findAll(filter: Record<string, unknown> = {}) {
    return this.model.find(filter).lean();
  }

  async findById(id: string) {
    return this.model.findById(id).lean();
  }

  async findOne(filter: Record<string, unknown>) {
    return this.model.findOne(filter).lean();
  }

  async update(
    id: string,
    data: UpdateQuery<TSchema>
  ) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async count(filter: Record<string, unknown> = {}) {
    return this.model.countDocuments(filter);
  }

  async exists(filter: Record<string, unknown>) {
    return this.model.exists(filter);
  }
}