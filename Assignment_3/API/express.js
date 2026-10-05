const express = require("express");
const fs = require("node:fs");

const app = express();
app.use(express.json());

const db = fs.readFileSync("../db/users.json", "utf8");
let users = JSON.parse(db)
function WritetoDB(){
    fs.writeFileSync("../db/users.json",JSON.stringify(users));
}
function checkIfEmailIsVaild(email) {
    if(email.includes("@")) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                return true;
            }
        }
    }
    return false;
}

//Add new user
app.post("/user", (req, res) => {
    let {email} = req.body;
    let emailIsExist =   checkIfEmailIsVaild(email);
    let newUser = {id:Math.max(...users.map(user => user.id)), ...req.body};
    if(!emailIsExist) {
        users.push(newUser);
        WritetoDB();
        res.status(200).json({
            message: "User add successfully",
            user: req.body
        });
    }else{
        res.status(409).json({
            message: "Email already exists",
            success: false,
            user:email
        })
    }
 });
//Update user
app.patch("/user/:id", (req, res) => {
    const id = Number(req.params.id);
    const { email } = req.body;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }
    const emailExists = users.some(user => {
        return user.email === email && user.id !== id;
    });

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Invalid email",
            success: false
        });
    }
    if (emailExists) {
        return res.status(409).json({
            message: "Email already exists",
            success: false,
            email
        });
    }
    users[userIndex] = {
        ...users[userIndex],
        ...req.body,
        id
    };
    WritetoDB();
    res.json({
        message: "User updated successfully",
        success: true,
        user: users[userIndex]
    });
});
//Delete User
app.delete("/user/:id", (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found",
            success: false
        })
    }else{
        users.splice(userIndex, 1);
        WritetoDB();
        res.status(200).json({
            message: "User deleted successfully",
            success: true,
        })
    }
})
//Get user by name if exist or get All users
app.get("/user", (req, res) => {
    const { name } = req.query;
     if (name) {
         const usersExisted = users.filter(user => user.name === name);
         if (usersExisted.length === 0) {
             return res.status(404).json({
                 message: "User not found",
                 success: false
             });
         }
         res.status(200).json({
             message: "Users found successfully",
             success: true,
             usersExisted
         });
     }
     else{
         res.status(200).json({
             message: "Get all users successfully",
             success: true,
             users: users
         })
     }
});
//Get users by Min age
app.get("/user/filter", (req, res) => {
    const minAge = Number(req.query.minAge);

    const filteredUsers = users.filter(
        user => user.age >= minAge
    );

    if (filteredUsers.length === 0) {
        return res.status(404).json({
            message: `No user found with age equal or greater than ${minAge}`,
            success: false
        });
    }

    res.status(200).json({
        message: "Users found successfully",
        success: true,
        users: filteredUsers
    });
});
// get user by id
app.get("/user/:id", (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }
    res.status(200).json({
        message: "User found successfully",
        success: true,
        user: users[userIndex]
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});