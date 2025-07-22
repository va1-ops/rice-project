from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
import rasterio
from rasterio.enums import Resampling
from atmospheric_correction import atmospheric_correction
from radiometric_correction import radiometric_correction
from geometric_correction import geometric_correction

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

# 设置上传文件夹
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 确保上传文件夹存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        return jsonify({'message': 'File uploaded successfully', 'file_path': file_path}), 200

@app.route('/preprocess', methods=['POST'])
def preprocess_file():
    file_path = request.form.get('file_path')
    selected_options = request.form.get('options')
    
    if not file_path or not selected_options:
        return jsonify({'error': 'No file provided or invalid options'}), 400
    
    # 调用预处理函数
    result = call_preprocessing_functions(file_path, selected_options)
    return jsonify({'result': result}), 200

def call_preprocessing_functions(file_path, selected_options):
    with rasterio.open(file_path) as src:
        meta = src.meta
        image_data = src.read()
        
        # 根据用户选择调用不同的预处理函数
        if 'radiometricCorrection' in selected_options:
            image_data = radiometric_correction(image_data, meta)
        if 'atmosphericCorrection' in selected_options:
            image_data = atmospheric_correction(image_data, meta)
        
        # 保存预处理后的影像
        corrected_meta = meta.copy()
        corrected_meta.update(dtype=rasterio.float32)
        output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'corrected_image.tif')
        with rasterio.open(output_path, 'w', **corrected_meta) as dst:
            dst.write(image_data)
    
    return "Preprocessing completed"


if __name__ == '__main__':
    app.run(port=8081)