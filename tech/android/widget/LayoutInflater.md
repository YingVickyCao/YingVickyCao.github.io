# LayoutInflater

```
View inflate(int resource, ViewGroup root)
View inflate(int resource, ViewGroup root， bool)
```

```java

    // Fragment, TestAlertDialogFragment.java
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_reuse_adapter_item_view_in_list_view, container, false); // ✔
        //return inflater.inflate(R.layout.fragment_reuse_adapter_item_view_in_list_view, container); // ✗
    }
```

```java
// Adapter,ModelAdapter.java
View getView(int position, View convertView, ViewGroup parent) {
    // ✔
    LayoutInflater.from(context).inflate(R.layout.list_item_view_4, parent, false)

    // ✗
    /**
    * Not Recommended.
    * item height != 64dp.  Wrong
    *
    * root = null -> LayoutParams ViewGroup generate a default set.
    *
    * android:layout_XXX attributes are always be evaluated in the context of the parent view.
    * As a result, without any parent, all LayoutParams declared on the root element of XML tree will just get thrown away.
    * Without LayoutParams, the ViewGroup that eventually hosts the inflated layout is left to generate a default set for app..
    */
    // LayoutInflater.from(context).inflate(R.layout.list_item_view_6, null)

}
```

```java
// Dialog, TestAlertDialogFragment.java
 // ✔
LayoutInflater.from(context).inflate(R.layout.dialog_view, null)

```
