import { Ratings } from "../model/association.js";

export const rateStore = async (req, res) => {
    const { storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    try {
        const store = await Ratings.findOne({ where: { storeId } });
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const newRating = await Ratings.create({
            userId,
            storeId,
            ratingValue: rating
        });

        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}