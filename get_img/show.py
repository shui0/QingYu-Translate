import os
import time

import requests

while True:
    path = r'../show/static/img'
    lists = os.listdir(path)
    # 最后对lists以文件时间从小到大排序
    lists.sort(key=lambda x: os.path.getmtime((path + "\\" + x)))
    # 获取最新文件的绝对路径，列表中最后一个值,文件夹+文件名
    file_new = os.path.join(path, lists[-1])
    file_new = file_new.replace(path, "").replace("\\", "")
    #图片获取
    os.system("python get_img.py")
    #图片翻译
    os.system("python identify_translate.py")
    #连接到本地端口
    url = "http://127.0.0.1:8080/api/img/imgName"
    data = {
        "imgNameCheck":file_new
    }
    response = requests.post(url,data)
    print(response)
    time.sleep(10)
# 利用cv展示图片（已舍弃）
#    img = cv.imread(file_new)
#     cv.namedWindow('res_show', cv.WINDOW_NORMAL)
#     cv.setWindowProperty('res_show', cv.WND_PROP_FULLSCREEN, cv.WINDOW_FULLSCREEN)
#     cv.imshow('res_show', img)
#     #cv.resizeWindow('res_show',)
#     if ord('q') == cv.waitKey(0):
#         break
# cv.destroyAllWindows()