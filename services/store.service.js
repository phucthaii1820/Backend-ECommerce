import { mongoose } from "mongoose";
import Store from "../models/Store.model.js";

export default {
  async createStore(name, address, province, district, ward) {
    return await Store.create({
      name,
      address,
      province,
      district,
      ward,
    });
  },

  async getAllStores() {
    return await Store.find();
  },

  async removeStore(id) {
    return await Store.findByIdAndDelete(id);
  },
};
