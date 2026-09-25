const http = require('node:http');
const fs = require('node:fs')
const server = http.createServer(handler);

function handler(req, res){
    const {method , url } = req;

    let data = fs.readFileSync("./db/users.json", "utf8");
    let users = JSON.parse(data);
    // Get all users
    if (url === "/user" && method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({message:"done" , success:true, data:users}));
        res.end();
    } 
    // get user by id 
    else if(url.startsWith("/user/") && method === "GET"){
        let id = Number( url.split('/')[2]);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex===-1) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            return res.end(JSON.stringify({
                message: "User not found",
                success: false
            }));
        }else{
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message: "User  fetched successfully",
                success: true,
                data : users[userIndex]
            }));
        }


    }
    // add new user to db
    else if (url === "/user" && method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            body = JSON.parse(body);
            const isExist = users.some( (user) => user.email === body.email );

            if (isExist) {
                res.writeHead(409, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Email already exists",
                    success: false
                }));

            } else {
                body.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                users.push(body);
                fs.writeFileSync(
                    "./db/users.json",
                    JSON.stringify(users, null, 2),
                    { flag: "w" }
                );
                res.writeHead(201, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "User added successfully",
                    success: true,
                    data: body
                }));
            }
        });
    } 
    // update user
    else  if (url.startsWith("/user/") && method === "PATCH") {
    const id = Number(url.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => { body += chunk;});
    req.on("end", () => {
        let data = JSON.parse(body);
        const user = users.find((user) => user.id === id);
        if (!user) {
            res.writeHead(404, { "Content-Type": "application/json"});
            return res.end(JSON.stringify({
                message: "User not found",
                success: false
            }));
        }

        if (data.name !== undefined) {user.name = data.name;}
        if (data.age !== undefined) {user.age = data.age;}
        if (data.email !== undefined) {
            const isExist = users.some(user => user.email === data.email && user.id !== id);
            if (isExist) {res.writeHead(409, {"Content-Type": "application/json"});
                return res.end(JSON.stringify({
                    message: "Email already exists",
                    success: false
                }));
            }
            user.email = data.email;
        }
        fs.writeFileSync( "./db/users.json",JSON.stringify(users));
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({
            message: "User updated successfully",
            success: true,
            data: user
        }));
    });
}
    // delete user
     else if (url.startsWith("/user/") && method === "DELETE") {
        const id = Number(url.split("/")[2]);
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex===-1) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            return res.end(JSON.stringify({
                message: "User not found",
                success: false
            }));
        }else{
            users.splice(userIndex,1)
            fs.writeFileSync("./db/users.json", JSON.stringify(users));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message: "User Deleted successfully",
                success: true,
            }));
        }
    }else {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Route not found",
            success: false
        }));
    }
}

server.listen(3000,()=>{
    console.log('server running on port 3000');
    
})