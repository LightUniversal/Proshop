import bcrypt from "bcryptjs";
const users = [
    {
        name : "Admin User",
        email : "admin@gmail.com",
        profile: "4",
        password : bcrypt.hashSync("12345", 10),
        isAdmin : true,
        faculty : "Engineering",
        department: "Electronics Engineering"
    },
    {
        name : "Lydia Chisom",
        email : "lych@gmail.com",
        profile: "3",
        password : bcrypt.hashSync("12345", 10),
        isAdmin : false,
        faculty : "Engineering",
        department: "Electronics Engineering"
    },
    {
        name : "Ebele Ike",
        email : "ike@gmail.com",
        profile: "1",
        password : bcrypt.hashSync("12345", 10),
        isAdmin : false,
        faculty : "Engineering",
        department: "Electronics Engineering"
    },
    {
        name : "Nna Goodness",
        profile: "2",
        email : "nnagood@gmail.com",
        password : bcrypt.hashSync("12345", 10),
        isAdmin : false,
        faculty : "Engineering",
        department: "Electronics Engineering"
    },
];

export default users;