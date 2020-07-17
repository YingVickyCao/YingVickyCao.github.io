# Fragmet

# 1 设计 Fragment 的目的？

为了适应大屏幕的平板电脑。使用 Fragment 对 UI 组件进行分组、模块化管理 => Fragment 是可复用的组件。
![Figure 1. An example of how two UI modules defined by fragments can be combined into one activity for a tablet design, but separated for a handset design.](https://developer.android.google.cn/images/fundamentals/fragments.png)

# 2 Fragment 特征

- Fragment 拥有自己的输入事件，有自己的生命周期——受到 Activity 的生命周期的影响。
- 只有 Activity 处于活动状态时，才能操作 Fragment。

# 3 Fragment Lifecycle

`Figure 2. The lifecycle of a fragment (while its activity is running).`

![Figure 2. The lifecycle of a fragment (while its activity is running).](https://developer.android.google.cn/images/fragment_lifecycle.png)

`Figure 3. The effect of the activity lifecycle on the fragment lifecycle`

![Figure 3. The effect of the activity lifecycle on the fragment lifecycle.](https://developer.android.google.cn/images/activity_fragment_lifecycle.png)

## onCreate

- 系统创建 Fragment 对象后回调该方法

## onCreateView

- 当 Fragment 绘制界面组件时回调该方法

## onPause

- 当离开 Fragment 时回调该方法

# 4 Fragment 与 Activity 通信

## 获取实例

```
Fragment.getActivity()
```

```
Activity.getFragmentManager().findFragmentById(int id)
/
Activity.getFragmentManager().findFragmentByTag(String tag)
```

## 传递数据

### Activity -> Fragment（3）

- Type1:

```
fragment = new BookDetailFragment();
fragment.setArguments(Bundle);
```

- Type2: Global data

- Type3:

```
Fragment fragment = getSupportFragmentManager().findFragmentById(R.id.book_detail_container);
((BookDetailFragment) fragment).setBook(BookContent.ITEM_MAP.get(id));
```

### Fragment -> Activity（3）

- Type1: 回调接口

`BookListFragment.java`

```
public class BookListFragment extends ListFragment {
    private Callbacks mCallbacks;

    public interface Callbacks {
        void onItemSelected(Integer id);
    }

      @Override
    public void onAttach(Context context) {
        super.onAttach(context);

        if (!(context instanceof Callbacks)) {
            throw new IllegalStateException("BookListFragment所在的Activity必须实现Callbacks接口!");
        }
        mCallbacks = (Callbacks) context;
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mCallbacks = null;
    }
}
```

`TestFragmentActivity.java`

```

public class TestFragmentActivity extends AppCompatActivity implements BookListFragment.Callbacks {

    @Override
    public void onItemSelected(Integer id) {
        ...
    }
}

```

- Type2: Global data

- Type3:  
  ((TestFragmentActivity)getActivity()).XXX

# 5 将 Fragment 添加到 Activity 的方式

2 种

- Type1:`<fragment>`

```
<fragment
        android:id="@+id/book_list"
        android:name="com.hades.example.android.app_component._fragment.BookListFragment"
        android:tag="com.hades.example.android.app_component._fragment.BookListFragment" />
```

`android:id` => `getFragmentManager().findFragmentById(int id)`  
`android:tag` => `getFragmentManager().findFragmentByTag(String tag)`

- Type2:  
  `FragmentManager.add()/remove/replace()`

# 6 Support phone and tablet

Type1:

```
setContentView(R.layout.activity_book_list);
```

`/values/refs.xml`

```
<item name="activity_book_list" type="layout">@layout/activity_book_single_pane</item>
```

`/values-large/refs.xml`

```
<item name="activity_book_list" type="layout">@layout/activity_book_two_pane</item>
```

Type2:

```
/layout/activity_book_list          : single_pane
/layout-large/activity_book_list    : two_pane
```

# 7 BackStack

FragmentTransaction（Fragment 事务）。与数据库事务类似，数据库事务代表对底层数组的多个更新操作。
FragmentTransaction 代表了 Activity 对 Fragment 执行的多个改变操作:add()/remove()/replace()，最后 commit 提交事务。

# 8 `Activity.getFragmentManager()` vs `Fragment.getChildFragmentManager()`

```
Activity.getFragmentManager()：
对应 Activity 管理

Fragment.getChildFragmentManager():
Fragment 它自己管理 添加的Fragment
```

# 9 Refresh fragment contents

```java
Fragment fragment = getSupportFragmentManager().findFragmentByTag("your_fragment_tag");
FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
ft.detach(fragment);
ft.attach(fragment);
ft.commit();
```

# PO

## 重复利用 Fragment

```
Fragment fragment = find Fragment
if (null == fragment) {
    new, then replace fragment
} else {
    if instanceof, then update fragment
}
```
