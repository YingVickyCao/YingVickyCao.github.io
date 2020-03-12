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
    <item name="colorAccent">@android:color/holo_orange_dark</item>
</style>
```

- QA : Left of dynamic Circle when Clicked is hidden  
  android:layout_marginStart : Work  
  android:paddingStart : Not work
