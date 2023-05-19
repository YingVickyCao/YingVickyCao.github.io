# EditText

- Android EditText 有 3 种状态，disable、正常、选中

```xml
<EditText

  android:background="@drawable/xml_edittext_bg"
  android:textColor="@color/color_edittext_text_color"
  android:textColorHint="@color/xml_edittext_text_color_hint" />
```

```xml
<!-- xml_edittext_bg -->
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/xml_edittext_selected" android:state_enabled="true" android:state_focused="true" />
    <item android:drawable="@drawable/xml_edittext_default" android:state_enabled="true" />
    <item android:drawable="@drawable/xml_edittext_disable" android:state_enabled="false" />
</selector>
```
