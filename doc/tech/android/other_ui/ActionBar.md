# ActionBar

- Android >=3.0, Default open ActionBar
- Android>=5.0,ActionBar Navigation 已过时。

# 1. Close Action Bar

```
<application
    android:theme="Theme.AppCompat.Light.NoActionBar">
```
关闭后，不能使用代码显示和隐藏

# 2. 使用代码显示和隐藏 Action Bar
```
Use AppCompatActivity:

ActionBar actionBar = getSupportActionBar();
actionBar.show();

actionBar.hide();

```

# 3. app:showAsAction="always|withText"`
- `always`:总是显示在actionBar上
- `withText`:显示在actionBar上，并显示该menu 的text
- `never`:不显示在actionBar上
- `if_room`:当actionBar位置足够时才显示
-  `collapseActionView`:折叠成普通菜单

# 4. 启用程序条导航
![启用程序条导航](https://yingvickycao.github.io/img/android/other_ui/action_bar/enable_app_icon.jpg)

# 5. Navigation
- ViewPager + PagerTitleStrip
- Android>=5.0,ActionBar Navigation 已过时。
- TabLayout + ViewPager
- BottomNavigationView

# TBD
## TBD:ActionBar ActionView `actionViewClass` or `actionLayout` 不显示
