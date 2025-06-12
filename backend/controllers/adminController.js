import { Users, Store, Ratings } from '../model/association.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getStoreRatings = async (req, res) => {
    const { storeId } = req.params;
    try {
        const storeRating = await Store.findOne({
            where: { storeId }
        });
        if (!storeRating) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(storeRating.rating);

    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const addUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const newUser = await Users.create({ name, email, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const addStore = async (req, res) => {
    const { name, address, email, storeOwnerId } = req.body;
    try {
        const newStore = await Store.create({ name, address, email, storeOwnerId });
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getDashboard = async (req, res) => {
    try {
        const userCount = await Users.count();
        const storeCount = await Store.count();
        const ratingCount = await Ratings.count();

        res.status(200).json({
            userCount,
            storeCount,
            ratingCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}