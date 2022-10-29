import json
import os
import sys

from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import (
    QPushButton, QApplication, QMessageBox, QDesktopWidget, QMainWindow, QComboBox, QInputDialog)


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setObjectName("MainWindow")
        self.setStyleSheet("#MainWindow{border-image:url(background.png)}")
        self.comboBoxl = QComboBox(self)
        self.comboBoxl.move(700, 150)
        self.comboBoxl.resize(150, 50)
        self.comboBoxl.addItems(['选择你的窗口', '微信', 'pycharm', '魔女的夜宴'])
        self.comboBoxl.currentIndexChanged[str].connect(self.get_window_name)
        with open("window.json", 'r') as window_json:
            window_dict = json.load(window_json)
            for item in window_dict.items():
                self.comboBoxl.addItems([item[0]])

        btn1 = QPushButton('新增翻译窗口', self)  # 按钮
        btn1.resize(100, 50)
        btn1.move(700, 250)
        btn1.clicked.connect(self.buttonClicked)
        btn2 = QPushButton('删除翻译窗口', self)  # 按钮
        btn2.resize(100, 50)
        btn2.move(700,350)
        btn2.clicked.connect(self.buttonClicked)
        btn3 = QPushButton('输入密钥', self)  # 按钮
        btn3.resize(100, 50)
        btn3.move(700, 450)
        btn3.clicked.connect(self.buttonClicked)
        btn4 = QPushButton('开始翻译', self)  # 按钮
        btn4.resize(100, 50)
        btn4.move(700, 550)
        btn4.clicked.connect(self.buttonClicked)

        self.resize(942, 659)
        self.center()
        self.setWindowTitle('清雨翻译器')
        self.setWindowIcon(QIcon('ico.jpg'))
        self.show()

    def center(self):  # 窗口居中

        qr = self.frameGeometry()
        cp = QDesktopWidget().availableGeometry().center()
        qr.moveCenter(cp)
        self.move(qr.topLeft())

    def closeEvent(self, event):#关闭窗口时提示
        reply = QMessageBox.question(self, 'Message',
                                     "您确定要关闭吗?", QMessageBox.Yes |
                                     QMessageBox.No, QMessageBox.No)
        if reply == QMessageBox.Yes:
            event.accept()
        else:
            event.ignore()

    def addWindow(self):
        text, ok = QInputDialog.getText(self,"新建翻译窗口","输入title")
        if ok and text:
            Title = text
            text, ok = QInputDialog.getText(self, "新建翻译窗口", "输入class")
            if ok and text:
                Class = text
                with open("window.json", 'r',encoding='utf-8') as window_json:
                    window_dict = json.load(window_json)
                    window_dict[Title] = Class
                with open("window.json", 'w+',encoding='utf-8') as window_json:
                    json.dump(window_dict,window_json)
            os.system("python start.py")

    def delWindow(self):
        text, ok = QInputDialog.getText(self, "删除翻译窗口", "输入要删除的窗口名")
        if ok and text:
            Title = text
            with open("window.json", 'r', encoding='utf-8') as window_json:
                window_dict = json.load(window_json)
                window_dict.pop(Title)
            with open("window.json", 'w+', encoding='utf-8') as window_json:
                json.dump(window_dict, window_json)
        os.system("python start.py")

    def get_key(self):
        text, ok = QInputDialog.getText(self, "输入APP_KEY", "输入APP_KEY")
        if ok and text:
            key = text
            text, ok = QInputDialog.getText(self, "输入APP_SECRET", "输入APP_SECRET")
            if ok and text:
                secret = text
                with open("api_key.json", 'w+', encoding='utf-8') as key_json:
                    key_dict={}
                    key_dict[key] = secret
                    json.dump(key_dict, key_json)


    def buttonClicked(self):
        sender = self.sender()
        if sender.text() == '开始翻译':
            os.system("python show.py")
        if sender.text() == '新增翻译窗口':
            self.addWindow()
        if sender.text() == '删除翻译窗口':
            self.delWindow()
        if sender.text() == '输入密钥':
            self.get_key()


    def get_window_name(self):
        with open('windowname.txt', 'w') as file:
            file.write(self.comboBoxl.currentText())


def main():
    app = QApplication(sys.argv)
    ex = MainWindow()
    sys.exit(app.exec_())#窗口退出


if __name__ == '__main__':
    main()