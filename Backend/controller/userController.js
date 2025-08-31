const bcrypt = require('bcryptjs');
const User = require('../models/User');


const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User added successfully", user });

    }catch(error){
        res.status(500).json({ message: "Error adding user", error });
    }
    
};



const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    
    }catch(error){
        res.status(500).json({ message: "Error fetching users", error });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    try{

        const hashedPassword = await bcrypt.hash(password, 10);
        const updateUser = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true });


        const user = await User.findById(id);
        
        if(!user){
            return res.status(404).json({ message: "User not found"});
        }
        
        if(name){
            
            user.name = name;
        }
        if(email){
            
            user.email = email;
        }
        if(password){
            
            user.password = await bcrypt.hash(password, 10);
        }
        
        await user.save();
        res.status(200).json({ message: "User updated successfully", user });
    }catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

module.exports = {  addUser, getAllUsers, updateUser, deleteUser };