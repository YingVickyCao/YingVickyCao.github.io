# ObjectAnimator

`TestObjectAnimationFragment.java`
ObjectAnimator 继承自 ValueAnimator 类，即底层的动画实现机制是基于 ValueAnimator 类

# 1 原理

- 实现动画的原理
  直接对对象的属性值进行改变操作，从而实现动画效果

- 本质原理

```java
// Example：对 propertyName， 传入了：alpha、rotation、translationX 和 scaleY 等对象的属性值，从而实现了平移、旋转、缩放、透明度的动画。
public static ObjectAnimator ofFloat(Object target, String propertyName, float... values) {
        ObjectAnimator anim = new ObjectAnimator(target, propertyName);
        anim.setFloatValues(values);
        return anim;
    }
```

propertyName 这个参数是可以传入对象的任意属性值的，因为 ObjectAnimator 类实现动画效果的本质是：通过不断控制值的变化，再不断自动赋值给对象的属性。  
自动赋给对象的属性的本质是调用该对象属性的 set() 、get()方法进行赋值。

```java
// button 有 setTranslationX，getTranslationX
ObjectAnimator animatorX = ObjectAnimator.ofFloat(btn2, "translationX", 0f, 500f).setDuration(1000);
```

```java
// button 有 setBackgroundColor()，但没有getBackgroundColor() ：调用判断有没有该函数，因此不会报错。
ObjectAnimator color = ObjectAnimator.ofInt(btn2, "backgroundColor", 0xffff8800, 0xffcc0000).setDuration(1000);
```

![ObjectAnimator](https://yingvickycao.github.io/img/android/resources/ObjectAnimator.webp)

![ObjectAnimator_work_theory](https://yingvickycao.github.io/img/android/resources/ObjectAnimator_work_theory.webp)

## 以 “backgroundColor”为例，看如何调用的？

step 1 : 根据 mPropertyName，设置 PropertyValuesHolder

```java
ObjectAnimator color = ObjectAnimator.ofInt(btn2, "backgroundColor", 0xffff8800, 0xffcc0000).setDuration(1000);
color(start)

=> 设定值
/**
 * The property/value sets being animated.
 */
PropertyValuesHolder[] mValues;

/**
 * A hashmap of the PropertyValuesHolder objects. This map is used to lookup animated values
 * by property name during calls to getAnimatedValue(String).
 */
HashMap<String, PropertyValuesHolder> mValuesMap;
```

![ObjectAnimator_btn_backgroundColor_1](https://yingvickycao.github.io/img/android/resources/ObjectAnimator_btn_backgroundColor_1.webp)

step 2 ：获取如何调用 view 的 方法。
"backgroundColor"获取的是 id of setBackgroundColor。

```java
void setupSetter(Class targetClass) {
    void setupSetter(Class targetClass)  				            // targetClass is Button
    String methodName = getMethodName("set", mPropertyName); 	    //  mPropertyName="backgroundColor" -> methodName=setBackgroundColor
    long mJniSetter = nGetIntMethod(targetClass, methodName);       // methodName=setBackgroundColor -> id（mJniSetter） of method setBackgroundColor
}
    native static private long nGetIntMethod(Class targetClass, String methodName);
```

![ObjectAnimator_btn_backgroundColor_2](https://yingvickycao.github.io/img/android/resources/ObjectAnimator_btn_backgroundColor_2.webp)

不同类型的数据，调用 view 的方法不同。
![ObjectAnimator_btn_backgroundColor_method_1](https://yingvickycao.github.io/img/android/resources/ObjectAnimator_btn_backgroundColor_method_1.webp)

step 3: 更新动画，调用 native status 方法去调用 view 的方法

```java
// 最终通过method id of setBackgroundColor， 调用了button的setBackgroundColor方法。
void setAnimatedValue(Object target) {
    if (mJniSetter != 0) {
        nCallIntMethod(target, mJniSetter, mIntAnimatedValue);  // 通过id （mJniSetter）of method setBackgroundColor，直接设置button直接调用了setBackgroundColor
        return;
    }
}
native static private void nCallIntMethod(Object target, long methodID, int arg);
```

![ObjectAnimator_btn_backgroundColor_3](https://yingvickycao.github.io/img/android/resources/ObjectAnimator_btn_backgroundColor_3.webp)

不同类型的数据，调用 view 的方法不同。
![ObjectAnimator_btn_backgroundColor_method_2](https://yingvickycao.github.io/img/android/resources/ObjectAnimator_btn_backgroundColor_method_2.webp)

step 4 : 最终会调用 view 的方法
![ObjectAnimator_btn_backgroundColor_4](https://yingvickycao.github.io/img/android/resources/ObjectAnimator_btn_backgroundColor_4.webp)

# 2 使用

- 通过 xml 设置 ObjectAnimator
- java 代码通过 ObjectAnimator 类设置 ObjectAnimator
- java 代码 通过 PropertyValuesHolder 类 设置 ObjectAnimator
- xml 和 java 可以结合 AnimatorSet 使用。
- ObjectAnimator 可以结合 [AnimatedVectorDrawable](AnimatedVectorDrawable.md) 使用。

# 3 属性值

| objectAnimator 属性值 | 含义                                             |
| --------------------- | ------------------------------------------------ |
| android:propertyName  | 属性名称                                         |
| android:valueTo       | 动画结束时属性的值                               |
| android:valueFrom     | 动画开始时属性的值                               |
| android:duration      | 动画时长                                         |
| android:startOffset   | 动画延迟几秒播放，调用 start()方法后延迟         |
| android:repeatCount   | 动画重复次数                                     |
| android:repeatMode    | 动画重复的方式，restart/reverse                  |
| android:valueType     | 属性值类型，intType,floatType,colorType,pathType |

# 4 ObjectAnimator vs ValueAnimator

相同：不断改变值，然后不断赋值给对象的属性从而实现动画效果  
不同：  
ValueAnimator 类： 不断改变值，然后手动赋值给对象的属性从而实现动画效果，是间接对对象属性进行操作；  
ValueAnimator 根据 TimeInterpolator 在不断产生相应的数据，来传进 view ，view 自己做改变。

ObjectAnimator 类：不断改变值，然后自动赋值给对象的属性从而实现动画效果，是直接对对象属性进行操作；

# Ref

- https://www.dandelioncloud.cn/article/details/1454250206958301185
