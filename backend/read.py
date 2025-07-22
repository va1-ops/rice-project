from flask import Flask, request, jsonify
import rasterio
from rasterio.enums import Resampling

app = Flask(__name__)

@app.route('/preprocess', methods=['POST'])
def preprocess():
    file = request.files['file']
    if file:
        # 读取影像文件
        with rasterio.open(file) as src:
            # 获取影像的元数据
            meta = src.meta
            
            # 读取影像数据
            image_data = src.read()
            
            # 进行预处理，例如辐射校正
            corrected_data = radiance_correct(image_data)
            
            # 保存处理后的影像
            corrected_meta = src.meta.copy()
            corrected_meta.update(dtype=rasterio.float32)
            
            with rasterio.open('corrected_image.tif', 'w', **corrected_meta) as dst:
                dst.write(corrected_data)
        
        return jsonify({'message': 'Preprocessing completed successfully'}), 200
    else:
        return jsonify({'error': 'No file provided'}), 400

def radiance_correct(image_data):
    # 这里应该是具体的辐射校正算法
    scale_factor = 0.1
    return (image_data * scale_factor).astype(rasterio.float32)

if __name__ == '__main__':
    app.run(port=8081)