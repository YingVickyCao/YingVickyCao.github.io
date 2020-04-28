# CheckBox

# 1 Java API

- Listenser  
  setOnCheckedChangeListener // setChecked(bool) or Clicked

- setChecked(bool)  
  toogle selected status

- isChecked()  
  Check if CheckBox is selected.

# 2 XML

- android:checked="true"  
  Set default selected status

- android:gravity :  
  Change test position, not change button image position

# 3 QA

- QA : Change Image  
  android:button="@drawable/checkbox"

- QA : Change color of Image  
  android:buttonTint="@android:color/holo_green_dark"

- QA : Change color of Text  
  android:buttonTint

- QA : Change 点击时的动画效果颜色  
  AppCompatCheckBox + app:theme

```xml
// Have no effect on other widget
 <androidx.appcompat.widget.AppCompatCheckBox
   	app:theme="@style/checkBox" />

<style name="checkBox" parent="AppTheme">
  <!-- Option 2 -->
  <!-- UnChecked -->
  <item name="colorAccent">@android:color/holo_orange_dark</item>
  <!-- Checked: no color -->
  <item name="android:textColorSecondary">@android:color/holo_green_dark</item>

  <!-- Option 1 -->
  <!-- UnChecked ( 更优先 )-->
  <item name="colorControlActivated">@android:color/holo_blue_dark</item>
  <!-- Checked: no color ( 更优先 ) -->
  <item name="colorControlNormal">@android:color/holo_purple</item>
</style>
```

- QA : Left of dynamic Circle when Clicked is hidden  
  android:layout_marginStart : Work  
  android:paddingStart : Not work

- QA : Change icon size  
  Way 1 : Depressed  
  同时放缩文字和图片大小。图片清晰度改变。

```xml
<CheckBox
   android:scaleX="0.7"
   android:scaleY="0.7"/>
```

Way 2 : Recommended  
导入 svg 时，设置大小。不改变图片清晰度。
