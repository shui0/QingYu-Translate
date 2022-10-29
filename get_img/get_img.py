import json
import sys

import win32gui
from PyQt5.QtWidgets import QApplication

window = open("windowname.txt", 'r')
window_name = window.readline()
#预设置翻译窗口
if window_name == '微信':
    class_name = 'WeChatMainWndForPC'
    title = '微信'
elif window_name == 'pycharm':
    class_name = 'SunAwtFrame'
    title = 'start.py – start.py'
elif window_name == '魔女的夜宴':
    class_name = 'TVPMainWindow'
    title = '''[X'moe女装学院]魔女的夜宴V1.0(请勿网络直播本补丁内容)'''
#自定义翻译窗口
with open("window.json", 'r') as window_json:
    window_dict = json.load(window_json)
    for item in window_dict.items():
        if item[0] == window_name:
            class_name = item[1]
            title = item[0]
            print(title,class_name)
hwnd = win32gui.FindWindow(class_name, title)
app = QApplication(sys.argv)
screen = QApplication.primaryScreen()
img = screen.grabWindow(hwnd).toImage()
img.save("temp-bf.jpg")