import storeService from "../../services/store.service.js";

export default {
  async addStore(req, res) {
    if (req.user_data && req.user_data?.role === 1000) {
      const { name, address, province, district, ward } = req.body;
      const store = await storeService.createStore(
        name,
        address,
        province,
        district,
        ward
      );
      if (store)
        res.status(200).json({ success: true, message: "Add store success" });
      else
        res.status(400).json({ success: false, message: "Add store failed" });
    } else
      res
        .status(400)
        .json({ success: false, message: "You are not authorized" });
  },

  async getAllStores(req, res) {
    const stores = await storeService.getAllStores();
    if (stores) res.status(200).json({ success: true, data: stores });
    else
      res
        .status(400)
        .json({ success: false, message: "Get all stores failed" });
  },

  async removeStore(req, res) {
    if (req.user_data && req.user_data?.role === 1000) {
      const { id } = req.body;
      const store = await storeService.removeStore(id);
      if (store)
        res
          .status(200)
          .json({ success: true, message: "Remove store success" });
      else
        res
          .status(400)
          .json({ success: false, message: "Remove store failed" });
    } else
      res
        .status(400)
        .json({ success: false, message: "You are not authorized" });
  },
};
