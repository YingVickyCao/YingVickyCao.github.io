# ScrollView / NestedScrollView
- `NestedScrollViewHasRecycleViewFragment.java` 
- `ScrollViewHasListViewFragment.java` 
- `ScrollViewAboveListViewFragment.java`

Rule:   
Never add a RecyclerView or ListView to a scroll view. Doing so results in poor user interface performance and a poor user experience.  

# ScrollView API
````
// when content height < ScrollView height, 使得match_parent of LinearLayout  生效。
// When content height > ScrollView height，内容滑动，它的作用忽略。
anroid:fullViewport
````


# 1. 情况1：Only ListView
## 情况2：Top ListView Below ScrollView  
- 各自滑动不受影响  
https://yingvickycao.github.io/img/android/tdd/ScrollView_above_ListView.mp4

## 情况3：Top ScrollView Below ListView => = 情况2
- 各自滑动不受影响  
---
## 情况4：ScrollView has ListView    
- => ScrollView 中嵌套一个ListView / ScrollView + ListView  
- 目的：滑动整体。  
- 实际上会出现各种问题。  

### 问题1：ListView显示不全    
当ScrollView里的元素要填满ScrollView时，使用"match_parent"是不管用的，为`ScrollView`设置`android:fillViewport="true" 。  
https://yingvickycao.github.io/img/android/tdd/ScrollView_has_ListView_not_full_height.mp4
https://yingvickycao.github.io/img/android/tdd/ScrollView_has_Listview.mp4

### 问题2: 仅仅ListView可以滑动，ScrollView不可以滑动。 
***解决1：重写ListView，重写计算高度为item * itemHeight***    
Depressed，因为重写之后，不一定彻底解决，不同设备可能出现各种各样的问题。

解决2：ScrollView + ListView -> `android.support.v4.widget.NestedScrollView`  + RecyclerView / 

---

# 2. ScrollView + ListView -> NestedScrollView + RecyclerView
- `android.support.v4.widget.NestedScrollView`   
https://yingvickycao.github.io/img/android/tdd/NestedScrollview_has_RecycleView.mp4

### 问题1：整体滑动不连贯 

```
<!-- android:nestedScrollingEnabled="false"  : 滑动时连贯 -->
    <android.support.v7.widget.RecyclerView
    android:id="@+id/recyclerView"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:nestedScrollingEnabled="false" />
``` 

### ***问题2：RecyclerView获取了焦点***  
进入时，总是l2中 ListView获取焦点，L1默认上滑了，没有显示完全。应该是l1的内容获取焦点，并完全显示l1。？  
```
<NestedScrollView>
    <LinearLayout>
        <LinearLayout id=l1></LinearLayout>
        <LinearLayout id=l2>
        </ListView>
        </LinearLayout>
    </LinearLayout>
</NestedScrollView>
```

- Method1:
```
onCreate(){
    l1.view.setFocusable(true);
    l1.view.setFocusableInTouchMode(true);
    l1.view.requestFocus();
}

```
- Method2:
```
l1:
android:focusable="true"
android:focusableInTouchMode="true"
```

---
# 3. QA: After add fragment nested ScrollView, fragment swipe whole page when having too many items?

- `WrongSwipeWhoPageActivity.java`
- `WrongSwipeWhoPageFragment.java`

```
<ScrollView>
    <LinearLayout>
         <LinearLayout
            android:id="@+id/content"
            android:orientation="vertical" />
            
         <FrameLayout
            android:id="@+id/fragmentRoot"
            android:orientation="vertical" />
            
    </LinearLayout>
    
</ScrollView>
```

- Fragment可以看成一个特殊的view.     
ScrollView 的子 views 超出屏幕，就会 滑动。因此。要解决这种 bug，调整成 ScrollView和FrameLayout 为同层级即可。

=>

```
<FrameLayout>
    <ScrollView
       android:id="@+id/content">
    </ScrollView>

    <FrameLayout
        android:id="@+id/fragmentRoot"
        android:orientation="vertical" />
</FrameLayout>
```
# 4.  NestedScrollView 嵌套滑动机制 
>嵌套滑动机制 的基本原理可以认为是事件共享，即当子控件接收到滑动事件，准备要滑动时，会先通知父控件(startNestedScroll）；然后在滑动之前，会先询问父控件是否要滑动（dispatchNestedPreScroll)；如果父控件响应该事件进行了滑动，那么就会通知子控件它具体消耗了多少滑动距离；然后交由子控件处理剩余的滑动距离；最后子控件滑动结束后，如果滑动距离还有剩余，就会再问一下父控件是否需要在继续滑动剩下的距离（dispatchNestedScroll)...
https://www.jianshu.com/p/f55abc60a879


# 5. When In DialogFragment Page, collapse -> expand RecyclerView, can not show completely last item. 
`DragAndReorderListFragment.java` ver2
`layout`
```
<ConstrainLayout>
    <LinearLayout> // toolbar
    <NestedScrollView> // content
        <LinearLayout>>
            <TextView>
            // Part1 and Part2 : item view  has children； collapse <->expand； expand, show its children.
            // Part1:default item num = less = 3, more = all.
            <RecyclerView/> // Par1：

            <TextView>
            <RecyclerView/> // Par2：
        </LinearLayout>
    </NestedScrollView>
</ConstrainLayout>  
```
`item_view`
```
<LinearLayout>
    <TextView>
    <ToggleLinearLayout/> // children
</LinearLayout>
```

Soltuon:
ConstrainLayout -> FragmentLayout

## References:
- ScrollView https://developer.android.google.cn/reference/android/widget/ScrollView
- NestedScrollView https://developer.android.google.cn/reference/android/support/v4/widget/NestedScrollView
- https://www.jianshu.com/p/791c0a4acc1c
- https://blog.csdn.net/u012124438/article/details/53495951
- Andriid嵌套滑动和NestedScrollView   
https://www.jianshu.com/p/1806ed9739f6   
- https://www.jianshu.com/p/5e8cf2018f3b
- https://www.jianshu.com/p/f55abc60a879
