# String,Integer, and Arrays

## String

## String Array
`String[] strings = getResources().getStringArray(R.array.string_array)`   
`<string-array>`

## Quantity Strings (Plurals)
Although historically called "quantity strings" (and still called that in API), quantity strings should only be used for plurals. 
```
getResources().getQuantityString(R.plurals.numberOfSongsAvailable, count, count)
```

## styling and formatting strings

### Handle special characters

### Formatting strings
by putting your format arguments in the string resource

### Styling with HTML markup

### Styling with spannables
### Html.fromHtmlStyling with annotations

# Integer 

## Integer 

## Integer array 
`<integer-array>`  
`int[] ints = getResources().getIntArray(R.array.int_array)`

# Typed Array
- put color , drawable, etc.
```
Resources res = getResources();
TypedArray icons = res.obtainTypedArray(R.a.icons);
Drawable drawable = icons.getDrawable(0);
icons.recycle();

TypedArray colors = res.obtainTypedArray(R.array.colors);
int color = colors.getColor(0, 0);
colors.recycle();
```

# Ref
- [String resources](https://developer.android.google.cn/guide/topics/resources/string-resource)
- [More resource types](https://developer.android.google.cn/guide/topics/resources/more-resources)