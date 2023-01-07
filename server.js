const express = require('express')
const app = express()
const dotenv = require('dotenv');
const cors = require('cors')
const port = process.env.port || 3005;
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())



// load env variables
dotenv.config({ path: "./config/config.env" });


// Connect with database
connectDB();


// Route Files
const courses = require("./routes/course");
const admissions = require("./routes/admission");
const students = require("./routes/student")
const teachers = require("./routes/teacher")
const parents = require("./routes/parent")
const classes = require("./routes/class")
const studentAttendances = require("./routes/studentAttendance")


// Mount routes
app.use("/api/v1/courses", courses);
app.use("/api/v1/admissions", admissions);
app.use("/api/v1/students", students);
app.use("/api/v1/parents", parents);
app.use("/api/v1/teachers", teachers);
app.use("/api/v1/studentsAttendances", studentAttendances);
app.use("/api/v1/classes", classes);



app.listen(port, () => {
    console.log(`The SMS-SGN App listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send(`The SMS App is live on port ${port}`)
})
