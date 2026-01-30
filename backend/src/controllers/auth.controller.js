import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js"
import jwt from 'jsonwebtoken';
export async function signup(req, res) {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // console.log("Before existing User");


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists,please use a different one" });
        }
        // console.log("After existing User");
        const idx = Math.floor(Math.random() * (500 - 400 + 1)) + 400;
        // console.log("Iam here before the pravatar");

        const randomAvatar = `https://i.pravatar.cc/${idx}`;

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        })

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            });
            console.log(`Stream user created for ${newUser.fullName}`);
        } catch (err) {
            console.error("Error creating Stream User", err);
        }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })
        // console.log("Before cookie");
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        // console.log("After that");

        res.status(201).json({ success: true, user: newUser })

    } catch (err) {
        res.status(400).json({ message: "Something went Wrong" });
    }
}
export async function login(req, res) {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid email or password" })


        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({ success: true, user });

    } catch (err) {
        console.log("Error in login controller", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logout successful" });
}
export async function onboard(req, res) {
    try {
        // console.log("hey im here");
        const userId = req.user._id;
        console.log(userId);
        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;        

        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            console.log("in If block");
            return res.status(400).json({
                message: "All fields are required",
                missingFileds: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ],
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { ...req.body, isOnboarded: true }, { new: true });

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            });
            console.log(`Stream user updates after onboarding for ${updatedUser.fullName}`);
        }catch(streamError){
            console.log("Error updating Stream user during onboarding ",streamError.messae);
            
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (err) {
        console.log("OnBoarding Error", err.message);
        res.status(404).json({ message: "Error in OnBoarding" });

    }
}
export async function me(req,res){
    return res.status(200).json({user:req.user});
}