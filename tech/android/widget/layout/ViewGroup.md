# ViewGroup

# 1. check If have added view?
`ViewGroup.findViewById(id);`

# 2. check gone view size？
No matter what getVisibility is, width and height is all the same.
```
GONE,    height=400,width=-1
VISIBLE, height=400,width=-1
```
# 3. When add view (such as LinearLayout), by code, `layout_*` is missing, must invork`setLayoutParams()`
```
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_weight="10"
    ...
</LinearLayout>
```