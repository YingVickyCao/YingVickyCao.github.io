# RecyclerView

## RecyclerView 四大组成
- LayoutManager:Item布局
- Adapter：提供Item数据
- Item Animator：添加、删除Item时的动画
- Item Decoration： Item 之间的

## Add Item Divider?
### Method1: Item Decoration
```
RecyclerView.addItemDecoration(new SimpleDividerItemDecoration(getContext(), R.drawable.drawable_shape_4_divider_vertical));
```

`RecyclerView.ItemDecoration.java`
```
1. void onDrawOver(Canvas c, RecyclerView parent, RecyclerView.State state)
绘制Divider
先于drawChildren. 即在Item绘制之前被调用

2. onDrawOver
绘制Divider
在drawChildren之后。即在Item绘制之后被调用。
复写其中一个即可。

3. getItemOffsets 
设置Item偏移量。偏移的部分用于填充间隔样式，即设置分割线的宽、高；
在RecyclerView的onMesure()中会调用该方法。
outRect设置绘制的范围。通过outRect.set()为每个Item设置一定的偏移量，主要用于绘制Decorator。
```
- ✗ When Drag List, `onDraw` 仅仅被拖拽的那一行有效果，其他没有
- ✓ When Drag List, `onDrawOver` 所有行均有效果，div 不随着滑动

### Method2: Add <View> in Item View.
- ✓ If 使用<View> as div，所有行均有效果，div 随着滑动

## Click event
RecyclerView 不能像listView 直接设置 click/long click event。  
RecyclerView在Adapter 中对Item View设置事件。
```
public void onBindViewHolder(final ViewHolder holder, int position) {
```

## 上下滑动RecyclerView 边缘时有阴影.去掉?
测试中unproducted, API>=19
```
android:overSchollMode="never"
```

## Force scroll
```
mLinearLayoutManager = new LinearLayoutManager(getActivity()) {
            @Override
            public boolean canScrollVertically() {
                return false;
            }
        };
```
---

## RecyclerView滑动时滚动条

### `android:scrollbar`：是否显示scrollbar？
```
android:scrollbars="none/vertical/horizontal"
none:无. Default
vertical:右侧，垂直
horizontal:横向
```
当View为水平时，设置`none`/`vertical`.    若设置`horizontal`==`none` :无效

### android:fadeScrollbars="true":滑动后，过几秒，scrollbar 是否消失？
```
android:fadeScrollbars="true"
true: Default. After stop scroll a few seconds, fade scrollbar.
false: Always show scrollbar
```

### `android:scrollbarThumbVertical="@drawable/"`:自定义scrollbar的drawable

### `android:scrollbarFadeDuration="1"`: scrollbar fade duration in milliseconds. Default = 250

themes.xml
```
<item name="scrollbarFadeDuration">250</item> => View
```

### `android:scrollbarStyle="insideOverlay"`
```
<androidx.recyclerview.widget.RecyclerView
        android:id="@+id/list"
        android:layout_marginStart="15dp"
        android:layout_marginEnd="15dp"
        android:background="@android:color/white"
        android:fadeScrollbars="false"
        android:paddingStart="@dimen/size_15"
        android:paddingEnd="@dimen/size_15"
        android:scrollbarStyle="insideOverlay"
        android:scrollbars="vertical" />
```
```
android:scrollbarStyle="insideOverlay|insideInset|outsideOverlay|outsideInset"
insideOverlay:  padding区域内，在ItemView上面. Default
insideInset:    padding区域内，在ItemView下面
outsideOverlay: padding区域外，在ItemView上面
outsideInset:   padding区域外，在ItemView下面
```
scrollbarStyle_insideInset.png    
![scrollbarStyle_insideInset.png](https://yingvickycao.github.io/img/android/widget/recyclerview/scrollbarStyle_insideInset.png)

scrollbarStyle__insideOverlay.png    
![scrollbarStyle__insideOverlay.png](https://yingvickycao.github.io/img/android/widget/recyclerview/scrollbarStyle__insideOverlay.png)

scrollbarStyle_outsideInset.png    
![scrollbarStyle_outsideInset.png](https://yingvickycao.github.io/img/android/widget/recyclerview/scrollbarStyle_outsideInset.png) 

scrollbarStyle_outsideOverlay.png      
![scrollbarStyle_outsideOverlay.png](https://yingvickycao.github.io/img/android/widget/recyclerview/scrollbarStyle_outsideOverlay.png) 

---

## Communicating with Other Fragments
- Fragment -> Activity -> Other Fragments

---

# LayoutManager
`Layout manager binds view holder to its data, callding `onBindViewHolder()`. Then passing view holder's position to RecyclerView.`
- 决定何时复用Invisible Item，避免重复创建以及高成本的findViewById()
- 决定Item 的布局方式：横向、竖向、瀑布流

### LinearLayoutManager
- on-dimensional list
- Like ListView
- Default = Vertical

### GridLayoutManager
- two-dimensional grid
- Like GridView

### StaggeredGridLayoutManager
- two-dimensional grid, with each column slightly offset from the one before.
- 瀑布流

### Custom LayoutManager  by extending RecyclerView.LayoutManager 

---

# QA
## QA: ViewHolder 重复利用率？
The view holder  objects are managed by an adapter.    
The adapter creates vuew holders as need.   

- data num = 50
- one screen view item  = 13
- create view count = 19 = 13 + 3 + 3;  
```
public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) // Inflayout layout
public void onBindViewHolder(final ViewHolder holder, int position)  //  setView
```
- 被包含在NestedScrollView中，Item 全部展开，不能重复利用ViewHolder
```
<NestedScrollView>
    <LinearLayout>
        <RecyclerView/>
    </LinearLayout>
</<NestedScrollView>>

```

## QA: `app:layoutManager` 不起作用? 
If RecyclerView = root view, it works.
```
<!-- QA: app:layoutManager 不起作用?If RecyclerView = root view, it can work -->
<!-- QA: tools:listitem 不起作用? If RecyclerView = root view, it can work -->
<android.support.v7.widget.RecyclerView
    android:id="@+id/list"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_below="@+id/subject"
    android:layout_marginLeft="16dp"
    android:layout_marginRight="16dp"
    app:layoutManager="android.support.v7.widget.LinearLayoutManager"
    tools:listitem="@layout/widget_recyclerview_dummy_item" />
```

## QA: `tools:listitem` 不起作用? 
If RecyclerView = root view, it works.

## QA：滑动时粘连？
`android:nestedScrollingEnabled="false"`

## QA: notifyDataSetChanged()时导致图片闪烁？
https://www.jianshu.com/p/29352def27e6

Reason：  
数据刷新，导致item 中 image 即使拥有相同url也重新加载了。

Solution：  
item 设置唯一id，作为item 唯一 标志。   
当url 不变时，不需要重新加载图片，不需要重新计算，从而避免图片闪烁。

Adapter
```
setHasStableIds(true)
@Override
public long getItemId(int position) {
    return mListData.get(position).getId();
}
```
## QA: NestedScrollView RecyclerView 
```
<NestedScrollView>
    <RecyclerView/>
</NestedScrollView>
```
- RecyclerView 全部展开，不能重复利用View.
- [TBD]when drag out of window visible space, can not auto scroll and drag.

```
<RecyclerView/>
```

```
// 不出界面，拖拽
D/SimpleItemTouchHelperCallback: onChildDraw: pos=30,dx=0.0,dy=-16.998535,actionState=2
D/SimpleItemTouchHelperCallback: onChildDraw: pos=30,dx=0.0,dy=-36.516113,actionState=2
D/SimpleItemTouchHelperCallback: onChildDraw: pos=30,dx=0.0,dy=-54.72766,actionState=2
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=30,dropTargets=[29]
D/SimpleItemTouchHelperCallback: onChildDraw: pos=30,dx=0.0,dy=-71.76538,actionState=2
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=30,dropTargets=[29]
D/SimpleItemTouchHelperCallback: onChildDraw: pos=30,dx=0.0,dy=-87.20178,actionState=2

// 出界面，自动滑动
D/ItemTouchHelperAdapter: onBindViewHolder: position=34,@ItemViewHolder=230568434,vh list=17
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=33,dropTargets=[34]
D/SimpleItemTouchHelperCallback: onChildDraw: pos=33,dx=0.0,dy=76.94141,actionState=2
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=33,dropTargets=[34]
D/SimpleItemTouchHelperCallback: interpolateOutOfBoundsScroll: viewSize=121,viewSizeOutOfBounds=58,totalSize=1313,msSinceStartScroll=1785,r=28
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=33,dropTargets=[34]
D/SimpleItemTouchHelperCallback: interpolateOutOfBoundsScroll: viewSize=121,viewSizeOutOfBounds=58,totalSize=1313,msSinceStartScroll=1786,r=28
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=33,dropTargets=[34]
D/SimpleItemTouchHelperCallback: onMove: =33,target =34
D/SimpleItemTouchHelperCallback: onChildDraw: pos=34,dx=0.0,dy=11.384766,actionState=2
```

```
<NestedScrollView>
    <RecyclerView/>
</NestedScrollView>
```

```
// 不出界面，拖拽
D/SimpleItemTouchHelperCallback: onChildDraw: pos=9,dx=0.0,dy=-81.96484,actionState=2
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=9,dropTargets=[8]
D/SimpleItemTouchHelperCallback: onChildDraw: pos=9,dx=0.0,dy=-81.4082,actionState=2
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=9,dropTargets=[8]
D/SimpleItemTouchHelperCallback: onChildDraw: pos=9,dx=0.0,dy=-80.92529,actionState=2
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=9,dropTargets=[8]

出界面，不能自动滑动

D/SimpleItemTouchHelperCallback: onChildDraw: pos=21,dx=0.0,dy=79.04297,actionState=2
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=21,dropTargets=[22]
D/SimpleItemTouchHelperCallback: onChildDraw: pos=21,dx=0.0,dy=74.21411,actionState=2
D/SimpleItemTouchHelperCallback: chooseDropTarget: selected=21,dropTargets=[22]
D/ViewRootImpl@dc0b01d[DragAndReorderListActivity]: ViewPostIme pointer 1
D/SimpleItemTouchHelperCallback: onChildDraw: pos=21,dx=0.0,dy=73.47656,actionState=2
D/SimpleItemTouchHelperCallback: onChildDraw: pos=21,dx=0.0,dy=72.73647,actionState=2
D/SimpleItemTouchHelperCallback: onChildDraw: pos=21,dx=0.0,dy=70.36267,actionState=2
D/SimpleItemTouchHelperCallback: onChildDraw: pos=21,dx=0.0,dy=66.460175,actionState=2
```

# PO
## `RecyclerView.setHasFixedSize(true)`
## Partly update list
Adapter
```
notifyItemChanged(int)
notifyItemInserted(int)
notifyItemRemoved(int)

notifyItemRangeChanged(int, int)
notifyItemRangeInserted(int, int)
notifyItemRangeRemoved(int, int)
notifyItemRangeMoved(int, int)
```
## Change current item view status if possible, not by notifyItem* method.

# `RecyclerView` VS `ListView`
## `RecyclerView` 缓存机制 —— ViewHolder
https://www.jianshu.com/p/4f9591291365

RecyclerView.java

```
1. ArrayList<ViewHolder> mAttachedScrap    屏幕上
2. ArrayList<ViewHolder> mChangedScrap
3. ArrayList<ViewHolder> mCachedViews  屏幕外，Default = 2
4. List<ViewHolder>  mUnmodifiableAttachedScrap
5. RecycledViewPool mRecyclerPool 缓存池，多个RecycleView共用
6. ViewCacheExtension mViewCacheExtension   用户定制
7. ChildHelper mChildHelper - List<View> mHiddenViews    看不见
```

```
1. ChildHelper mChildHelper - List<View> mHiddenViews
2. Recycler.java
3. View getViewForPosition(int position);
```
![RecylerView_caching_behavior_is_viewholder.jpg](https://yingvickycao.github.io/img/android/widget/recyclerview/RecylerView_caching_behavior_is_viewholder.jpg)

# API
## `RecyclerView` 

```
1. android:descendantFocusability="blocksDescendants"


2. android:nestedScrollingEnabled="false"
// RecyclerView 不控制滑动，由NestedScrollView控制滑动，RecyclerView在NestedScrollView全部展开，不能重复利用ViewHolder
<NestedScrollView>
    <RecyclerView/>
</NestedScrollView>
```

```
1. View getChildAt(int index)
index = Index of child view(RecyclerView is a ViewGroup) , not adapter position.

2. void scrollToPosition(int position)
postion = adapter position，直接切换过去，无动画，很生硬
=>LayoutManager
void scrollToPosition(int position)'

3. void smoothScrollToPosition(int position)
postion = adapter position, 使用动画慢慢滑过去
=>LayoutManager
void smoothScrollToPosition(RecyclerView recyclerView, State state,int position)'

4. void setHasFixedSize(true)
当 Item 的改变不影响RecyclerView的宽高时，设置setHasFixedSize(true)，并通过增删改插的方法刷新RecyclerView。而不是任何数据变动均通过`notifyDataSetChanged()`.      

仅仅当宽高改变时，使用`notifyDataSetChanged()`整体刷新 list。
```

## Adapter
```
1. ViewHolder onCreateViewHolder(ViewGroup parent, int viewType)
Inflater item view. and return ViewHolder

2. void onBindViewHolder(final ViewHolder holder, int position)
Set data to view。
Set item view event

3. int getItemCount()

4. Partly update list
notifyItemChanged(int)
notifyItemInserted(int)
notifyItemRemoved(int)

notifyItemRangeChanged(int, int)
notifyItemRangeInserted(int, int)
notifyItemRangeRemoved(int, int)
notifyItemRangeMoved(int, int)

5. Fully update list
notifyDataSetChanged();

6. long getItemId(int position) // Return the stable ID for the item at position If hasStableIds()
position= Adapter position

7. void setHasStableIds(boolean hasStableIds) // each item in the data set has a a unique identifier of type,such as id
通常做法：增加每个item bean 中唯一的id

8. boolean hasStableIds() // item ,at a given position in the data set ,having a unique long value ?
```

## LayoutManager
```
1. canScrollHorizontally();//能否横向滚动
2. canScrollVertically();//能否纵向滚动

3. scrollToPosition(int position);//滚动到指定位置
4. smoothScrollToPosition(RecyclerView recyclerView, State state,int position)

5. setOrientation(int orientation);//设置滚动的方向
6. getOrientation();//获取滚动方向

7. findViewByPosition(int position);//获取指定位置的Item View
同RecyclerView - `View getChildAt(int index)`

```

## LinearLayoutManager
```
1.  findFirstCompletelyVisibleItemPosition();//获取第一个完全可见的Item位置
    findFirstVisibleItemPosition();//获取第一个可见Item的位置
    findLastCompletelyVisibleItemPosition();//获取最后一个完全可见的Item位置
    findLastVisibleItemPosition();//获取最后一个可见Item的位置

When
<NestedScrollView>
    <RecyclerView/>
</NestedScrollView>

first  = 0， last = 最后一个.

```

# Source
## Partly update list
```
notifyItemChanged(int)
notifyItemInserted(int)
notifyItemRemoved(int)

notifyItemRangeChanged(int, int)
notifyItemRangeInserted(int, int)
notifyItemRangeRemoved(int, int)
notifyItemRangeMoved(int, int)

```
=> RecyclerView.java  
=>最终调用:       
```
onItemRangeChanged(int,int);
onItemRangeInserted(int,int);
onItemRangeMoved(int,int);
onItemRangeRemoved(int,int);
```
 => `triggleUpdateProcesssor()`
```
void triggerUpdateProcessor() {
    // 根据mHasFixedSize判断是否requestLayout()
    if (POST_UPDATES_ON_ANIMATION && mHasFixedSize && mIsAttached) {
        ViewCompat.postOnAnimation(RecyclerView.this, mUpdateChildViewsRunnable);
    } else {
        mAdapterUpdateDuringMeasure = true;
        requestLayout();
    }
}
```
## Fully update list `notifyDataSetChanged()`
=> RecyclerView.java  
=> `onChanged()`   
```
@Override
        public void onChanged() {
            assertNotInLayoutOrScroll(null);
            mState.mStructureChanged = true;

            setDataSetChangedAfterLayout();
            if (!mAdapterHelper.hasPendingUpdates()) {
                requestLayout();
            }
        }
```
=> `requestLayout()`:整体刷list

## `RecyclerView` 
### View getChildAt(int index)
=> RecyclerView extends ViewGroup        
=> ViewGroup.java  
```
// Child views of this ViewGroup
private View[] mChildren;

public View getChildAt(int index) {
        if (index < 0 || index >= mChildrenCount) {
            return null;
        }
        return mChildren[index];
    }
```
### `void scrollToPosition(int position);`
=> LinearLayoutManager.scrollToPosition(int position);

## LayoutManager
### `View findViewByPosition(int position)`
=> ViewGroup.java  - `View getChildAt(int index)`

# Ref:
- https://medium.cn/@ipaulpro/drag-and-swipe-recyclerview-b9456d2b1aaf
- https://medium.cn/@ipaulpro/drag-and-swipe-recyclerview-6a6f0c422efd
- `RecyclerView setHasFixedSize(true)`的意义  https://blog.csdn.net/wsdaijianjun/article／details/74735039  
- https://blog.csdn.net/jerrywu145/article/details/51737643
- https://www.jianshu.com/p/29352def27e6
- https://www.jianshu.com/p/4f9591291365