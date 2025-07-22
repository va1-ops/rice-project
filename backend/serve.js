const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8081;

// 创建上传目录
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 设置 multer 存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

// 允许跨域请求
app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
}));

// 上传文件接口
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully.');
});

// 数据预处理接口
app.post('/preprocess', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const { selectedOptions } = req.body;
  const filePath = path.join(uploadDir, file.filename);

  

  // 根据选中的选项调用相应的 Python 脚本
  let command = '';
  if (selectedOptions.geometricCorrection) {
    command += `python ${path.join(__dirname, 'geometric_correction.py')} ${filePath} `;
  }
  if (selectedOptions.radiometricCorrection) {
    command += `python ${path.join(__dirname, 'radiometric_correction.py')} ${filePath} `;
  }
  if (selectedOptions.atmosphericCorrection) {
    command += `python ${path.join(__dirname, 'atmospheric_correction.py')} ${filePath} `;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error occurred during preprocessing.');
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Error occurred during preprocessing.');
    }
    console.log(`stdout: ${stdout}`);
    const result = stdout;
    res.json({ result });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});