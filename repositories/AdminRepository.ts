import Admin, { IAdmin } from "@/models/Admin";
import { BaseRepository } from "./BaseRepository";

class AdminRepository extends BaseRepository<IAdmin> {
  constructor() {
    super(Admin);
  }

  async findByEmail(email: string) {
    return this.findOne({ email });
  }

  async findFirst() {
    return this.model.findOne();
  }
}


export const adminRepository = new AdminRepository();