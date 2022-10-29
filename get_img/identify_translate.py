# -*- coding: utf-8 -*-
import base64
import hashlib
import json
import re
import sys
import time
import uuid
from imp import reload

import cv2
import numpy as np
import requests

reload(sys)


with open("api_key.json", 'r', encoding='utf-8') as key_json:
    key = json.load(key_json)
    for item in key.items():
        APP_KEY = item[0]
        APP_SECRET = key[APP_KEY]


YOUDAO_URL = 'https://openapi.youdao.com/ocrtransapi'
# APP_KEY = '59c6f8ffc875ab9c'
# APP_SECRET = 'pe5iyPm3O19MfQcLciOGwnZl9rFFzL6N'


def truncate(q):
    if q is None:
        return None
    size = len(q)
    return q if size <= 20 else q[0:10] + str(size) + q[size - 10:size]


def encrypt(signStr):
    hash_algorithm = hashlib.md5()
    hash_algorithm.update(signStr.encode('utf-8'))
    return hash_algorithm.hexdigest()


def do_request(data):
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    return requests.post(YOUDAO_URL, data=data, headers=headers)

def get_img(base):
    img = base64.b64decode(base)
    img11 = cv2.imdecode(np.asarray(bytearray(img), dtype=np.uint8), -1)
    img12 = cv2.imdecode(np.frombuffer(img, dtype=np.uint8), -1)
    np.testing.assert_almost_equal(img11, img12)



def connect():
    f = open(r'temp-bf.jpg', 'rb')  # 二进制方式打开图文件
    q = base64.b64encode(f.read()).decode('utf-8')  # 读取文件内容，转换为base64编码
    f.close()

    data = {}
    data['from'] = 'ja'
    data['to'] = 'zh-CHS'
    data['type'] = '1'
    data['q'] = q
    salt = str(uuid.uuid1())
    signStr = APP_KEY + q + salt + APP_SECRET
    sign = encrypt(signStr)
    data['appKey'] = "59c6f8ffc875ab9c"
    data['salt'] = salt
    data['sign'] = sign
    data['render'] = '1'
    response = do_request(data)
    ras = str(response.content,"utf8")
    img_base64 = re.search(r"\"render_image\":\"(.*)\"\,\"textAngle",ras).group(1)
    # 解码图片
    imgdata = base64.b64decode(img_base64)
    path = r'../show/static/img/'
    # 将图片保存为文件
    with open(path + str(time.localtime().tm_mon)+str(time.localtime().tm_mday)+str(time.localtime().tm_hour)+str(time.localtime().tm_min)+str(time.localtime().tm_sec)+".jpg", 'wb') as f:
        f.write(imgdata)

if __name__ == '__main__':
    connect()