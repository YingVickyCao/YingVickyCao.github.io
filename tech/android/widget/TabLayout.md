# TabLayout
 `TestSwitchColorInTheme2Activity.java`
 
# Content

## Event:`tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener())`

```
When select tab - TabLayout.Tab.select()
1 -> 1
onTabReselected: index=1

0 -> 1
onTabUnselected: index=0
onTabSelected: index=1
```

```
When click tab
1 ->1
1) customView.setOnClickListener   => Add if 

0 -> 1
1) customView.setOnClickListener
2)
onTabUnselected: index=0
onTabSelected: index=1
```

## Select tab

```
TabLayout.Tab tab = tabLayout.getTabAt(index);
if (null != tab) {
    tab.select();
}
```

## Tab Use custom view
```
TabLayout.Tab.setCustomView(tabView)

tab.setCustomView(Inflatedview)
Inflatedview.hashCode = Tab.getCustomView().hashCode
```