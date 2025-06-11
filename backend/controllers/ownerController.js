import { Store } from "../model/association.js";
import { Ratings } from "../model/association.js";

export const storeRating = async (req, res) => {
    const { storeId } = req.params;

    try {
        const store = await Store.findOne({ where: { id: storeId } });
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }
        const ratings = await Ratings.findAll({ where: { storeId } });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}