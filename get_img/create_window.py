import sys

from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import QWidget, QPushButton, QApplication, QDesktopWidget, QMainWindow


class  Window(QMainWindow,QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setObjectName("MainWindow")
        self.setStyleSheet("#MainWindow{border-image:url(background.png)}")
        btn1 = QPushButton('输入完成', self)  # 按钮
        btn1.resize(100, 50)
        btn1.move(450, 150)




        self.setWindowTitle('清雨翻译器')
        self.setWindowIcon(QIcon('ico.jpg'))
        self.resize(600, 400)
        self.center()
        self.show()


    def center(self):  # 窗口居中
        qr = self.frameGeometry()
        cp = QDesktopWidget().availableGeometry().center()
        qr.moveCenter(cp)
        self.move(qr.topLeft())


if __name__ == '__main__':
    app = QApplication(sys.argv)
    main = Window()
    sys.exit(app.exec_())