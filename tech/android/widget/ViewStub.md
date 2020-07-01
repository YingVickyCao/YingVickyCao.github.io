# ViewStub

## Usage

Delayed Loading of Views

## 加载布局的方式

Way 1 :

```
// 默认是View.GONE。 第一次inflate后就变成了 View.VISIBLE 状态
// 第2次调用会抛异常:java.lang.IllegalStateException: ViewStub must have a non-null ViewGroup viewParent
mViewStub.inflate()
```

Way 2 :

```
mViewStub.setVisibility(View.VISIBLE)

```

## 实现原理

- `android:inflatedId`的用途
- ViewStub 在初始化后从视图层级中移除. 即再次 view.findViewById(R.id.map_stub) = null
- ViewStub 的`layoutParameters`应用：如果 ViewStub 设置了 LayoutParams，则使用 LayoutParams。否则，忽略。
- `mInflatedViewRef`通过`弱引用`形式,建立 ViewStub 与加载的 View 的联系

## ViewStub 使用场景？延迟加载

- 让用户决定是否显示某视图
- 一些场景不需要某视图
- 某个加载后不会有变化，除非销毁该界面后重新加载
- 对象一个 layout，而不是一个 view

## 使用说明

- 使用`inflate()` 方法或者 `setVisibility(View.VISIBLE)`加载布局文件。
- 一旦加载布局完成后,ViewStub 会从当前布局层级中删除
- `android:id` 指定 ViewStub ID,用于查找 ViewStub 进行延迟加载
- `android:layout` 延迟加载布局的资源 id
- `android:inflatedId` 加载的布局被重写的 id
- 加载对象一个 layout，而不是一个 view
- ViewStub 中不能嵌套一个 Merge 标签

## `inflate()` vs `setVisibility`

相同点：  
都可以实现加载布局.

不同：  
setVisibility 只是在 ViewStub 第一次延迟初始化时,并且 visibility 是非 GONE 时,调用了 inflate 方法.

## 说明

- ViewStub 是一种不可见且大小为 0 的视图，可以延迟到运行时填充（inflate）布局资源。  
  当 ViewStub 设置为`可视`或 invoke `inflate()`后，填充布局资源，然后 ViewStub 被填充的视图替代。

- 关于 Stub 的解释  
  A stub is a small program routine that substitutes for a longer program, possibly to be loaded later or that is located remotely  
  在 Java 中,桩是指用来代替关联代码或者未实现代码的代码.

# Refs

- http://mobile.51cto.com/android-517729.htm
- [Re-using layouts with <include/>](https://developer.android.google.cn/training/improving-layouts/reusing-layouts)
- [Delayed Loading of Views](https://developer.android.google.cn/training/improving-layouts/loading-ondeman)
