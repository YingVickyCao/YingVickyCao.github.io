# Include
使用<include/>标签避免代码重复  
使用<include/>标签整理和组织布局。  

- 被 include 引入者，则应该去除android:layout_*的作用，并且指定android:layout_width和android:layout_height为0。因为使用者都会有自己的宽度和高度，一般重设
- 因为android:layout_alignParentBottom 等特殊属性仅仅适合 RelativeLayout，并不适合其他ViewGroup.
- 使用者，重设android:layout_*属性。  
指定android:layout_width和android:layout_height属性值。因为默认为0，如果不指定，则看不到被include 进来的布局。  
如果重设android:layout_width和android:layout_height为0 ，那么不重设android:layout_*属性。  