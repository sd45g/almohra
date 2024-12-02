var express = require('express');
const { dbConnection } = require('./database/dbConnection');
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });



//const multer = require('multer');
//var path = require('path');
//var cookieParser = require('cookie-parser');
const cors = require('cors'); // استدعاء مكتبة cors
const path = require('path');
var logger = require('morgan');
//ODM
//const mongoose = require("mongoose");
//session
//var session = require('express-session');
//var MongoDBStore = require('connect-mongodb-session')(session);
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const userRouter = require('./routes/user');
const advertismentRouter = require('./routes/advertisment');
const reservationRouter = require('./routes/Reservation');
const decorationRoutes = require('./routes/decoration');
const receiptRoutes = require('./routes/receipt');

const scheduleNotifications = require('./utils/notificationScheduler'); 



var app = express();
const PORT = process.env.PORT || 3000;
// Middleware لإعداد الـ CORS
// app.use(cors({
//   origin: 'http://localhost:5000', // رابط الواجهة الأمامية
//   credentials: true // السماح بإرسال الكوكيز مع الطلبات
// }));

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//middleware
app.use(logger('dev'));
//تحول البيانات الى object
app.use(express.json()); //لتحليل جسم الطلبات (request body) بتنسيق JSON.
// extended: false: لمعالجة البيانات البسيطة (نصوص وأرقام).
// extended: true: لمعالجة البيانات المعقدة (كائنات متداخلة أو مصفوفات).
app.use(express.urlencoded({ extended: true }));//لتحليل الطلبات التي تحتوي على بيانات مُرسلة بتنسيق URL-encoded.

// مش ضروري لان نبنوا في تطبيق مش موقع
//app.use(cookieParser());
//sessions
// var store = new MongoDBStore({
//      uri: 'mongodb://localhost:27017/event_db',
//      collection: 'mySessions'
//    });

// عرض الصورة في الواجهات الأمامية
//app.use('/uploads', express.static('uploads')); // عرض ملفات الصور
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));





// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // المجلد الذي سيتم حفظ الملفات فيه
//     },
//     filename: function (req, file, cb) {
//       // تحديد اسم الملف (يمكنك استخدام أي تسمية أخرى)
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
//   });
  
  // إعداد Multer مع التخزين المحدد
//   const upload = multer({ storage: storage });
  
//   // مسار لتحميل الملفات (POST)
//   app.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }
//     // إرسال رد عند نجاح عملية الرفع
//     res.send({
//       message: 'File uploaded successfully!',
//       file: req.file
//     });
//   });
  
 


//  app.use(session({
//     secret: 'This is a secret',
//     store: store,
//     resave: true,
//     saveUninitialized: true
//  }))
//static folder نحطوا فيه الحجات اللي شور html,css
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api/users', userRouter);
app.use('/api/advertisements', advertismentRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/decorations', decorationRoutes);
app.use('/api/receipts', receiptRoutes);




dbConnection()
  .then(() => {
    // تشغيل وظيفة الجدولة بعد الاتصال بقاعدة البيانات
    scheduleNotifications(); 

    app.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
  });


//mongoose.connect(process.env.DB_URL)

module.exports = app;





