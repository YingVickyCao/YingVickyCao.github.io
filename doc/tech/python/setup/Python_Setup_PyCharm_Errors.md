# PyCharm FAQ

# 1 PyCharm[2019.2] 导入本地 py 文件时，模块下方出现红色波浪线时如何解决

出现红色波浪线的原因是因为本地路径并未被标记“源目录”

Step 1: 标识为 Sources

![PyCharm_import_tip_red_1](/img/PyCharm_import_tip_red_1.png)

Step 2 : “Add source roots to PYTHONPAT”

![PyCharm_import_tip_red_2](/img/PyCharm_import_tip_red_2.png)

Step 3: “Mark Directory as”为“Sources Root”

![PyCharm_import_tip_red_3](/img/PyCharm_import_tip_red_3.png)

# 2 PyCharm[2019.2] keyword argiment 变 orange color

![PyCharm_keyword_argument_color_is_orange](/img/PyCharm_keyword_argument_color_is_orange.jpg)

Pycharm 的主题设置对参数的显示颜色为这个.  
可以改 ： 在 Preferences -> Color Scheme -> Python -> Keyword argument

# 3 pycharm[2019.2] 不代码提示 pygame

Step 1 : 检查是否代码本身有问题。

Step 2 : 检查代码提示是否成功开启。  
setting → Inspections → Spelling 开启  
setting → Inspections → Python 不打开/打开

Step 3 : 检查 IDE 省电模式是否关闭状态
file → power save mode 取消掉

Step 4 : 对第三方库支持不好，不能显示/部分显示. etc, pygame.(Resolved)  
pip 删除 pygame，然后离线安装 pygame。Restart PyCharm by `Invalidate and Restart`
http://www.pygame.org/download.shtml
