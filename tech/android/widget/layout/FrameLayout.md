# FrameLayout

## Set TextView position is center in parent FrameLayout and text is center
```
<FrameLayout>
    <TextView>
</FrameLayout.
```


- ✓ position is center in parent.   
```
android:layout_gravity="center"
/
FrameLayout.LayoutParams layoutParams = (FrameLayout.LayoutParams) textViewInFrameLayout.getLayoutParams();
textViewInFrameLayout.setLayoutParams(layoutParams);

```

- text is center
```
android:gravity="center"
/
textViewInFrameLayout.setGravity(Gravity.CENTER);
```