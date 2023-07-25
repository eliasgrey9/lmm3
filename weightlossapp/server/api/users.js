const express = require("express");
const router = express.Router();
const { User, Goal } = require("../db");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//This function helps us verify a user has been authenticated
const authenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Invalid token" });
    } else {
      res.status(401).json({ error: "Authentication failed" });
    }
  }
};

const onlyOwner = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.id === parseInt(req.params.id)) {
      next();
    } else {
      res.status(401).json({ error: "User is not the owner of the resource" });
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// SIGN IN
router.post("/signIn", async (req, res) => {
  console.log("signIn req.body", req.body);
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    res.status(401).send("Invalid email or password.");
  } else {
    const authenticated = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (authenticated) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.json({ token: token, userId: user.id });
    } else {
      res.status(401).send("Invalid email or password.");
    }
  }
});

//***SIGN UP***/

router.post("/signUp", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).send("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser);

    const userId = createdUser.id;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    res.json({ token, userId });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

//***END OF SIGN UP***//

//***ROUTES FOR USERS */

//CheckUser
router.get(
  "/checkUser/:id",
  [authenticated, onlyOwner],
  async (req, res, next) => {
    try {
      const result = await User.findOne({
        where: { id: req.params.id },
      });
      if (result) {
        res.send(result);
      }
    } catch (error) {
      console.log("get REQ ERROR", error);
      next(error);
    }
  }
);

//Delete User//

router.delete("/delete-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.destroy({ where: { id: userId } });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});

//Change Password//
router.put("/change-password", async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Verify the old password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    // Update the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/check-for-user-goal/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log("HELLO", userId);

  try {
    const goal = await Goal.findOne({
      where: { userId: userId, goalReached: null },
    });

    // Check if the user has a current goal
    if (goal) {
      // User has a goal
      res.send(goal);
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error retrieving user goal:", error);
    res.status(500).send("An error occurred");
  }
});

//EXAMPLES!!!///
router.get("/route-that-requires-auth", authenticated, (req, res) => {
  res.send("You are authenticated!");
});

router.get("/route-that-is-public", (req, res) => {
  res.send("We don't care if you are authenticated!");
});

router.get("/user/:id", [authenticated, onlyOwner], (req, res) => {
  res.send("You are authenticated and you own this user!");
});

module.exports = router;
