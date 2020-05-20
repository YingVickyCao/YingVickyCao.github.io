# Elevation

# 1 Elevation

Elevation is the relative distance between two surfaces along the z-axis.

## Depicting elevation

### Surface edges

- Shadow (Default)  
  Material Design displays elevation using shadows.  
  ![Depicting_elevation_by_shadow](https://yingvickycao.github.io/img/Depicting_elevation_by_shadow.png)

- Giving surfaces different colors
- Giving surfaces different opacities  
  ![Depicting_elevation_4_Surface_edges](https://yingvickycao.github.io/img/Depicting_elevation_4_Surface_edges.png)

### Surface Overlap

![Depicting_elevation_4_Surface_Overlap](https://yingvickycao.github.io/img/Depicting_elevation_4_Surface_Overlap.png)

> 1. Shadows show surface edges, surface overlap, and the degree of elevation
> 2. Different surface colors show surface edges and overlap, but not the degree of elevation.
> 3. Opacity shows surface edges and overlap, but not the degree of elevation.

### Distance

The degree of elevation difference between surfaces can be expressed using scrimmed backgrounds, or using shadows.

- Scrimmed backgrounds  
  ![depicting-elevation_Distance_4_Scrimmed_backgrounds](https://yingvickycao.github.io/img/depicting-elevation_Distance_4_Scrimmed_backgrounds.png)

- Shadows

![depicting-elevation_Distance_4_Shadows](https://yingvickycao.github.io/img/depicting-elevation_Distance_4_Shadows.png)

> Shadows make differences in surface elevation perceptible. The smaller, sharper shadow of the app bar (1) indicates it is at a lower elevation than the menu (2), which has a larger, softer shadow.

## [Default elevations](https://material.io/design/environment/elevation.html#default-elevations)

| Component                            | Default elevation values (dp) |
| ------------------------------------ | ----------------------------- |
| Dialog                               | 24                            |
| Bottom navigation bar                | 8                             |
| Bottom app bar                       | 8                             |
| Top app bar (scrolled state)         | 4                             |
| Top app bar (resting elevation)      | 0 or 4                        |
| Contained button (resting elevation) | 2                             |
| Switch                               | 1                             |
| Text button                          | 0                             |
| button                               | 2dp to 8dp                    |

Resting elevation

Upon user input, this button increases its elevation from 2dp to 8dp

# 2 Shadow

- What is Shadows?  
  Shadows in the Material environment are cast by a key light and ambient light.  
  In the Material Design environment, virtual lights illuminate the UI.  
  `Key lights` create sharper, directional shadows, called key shadows.  
  `Ambient light` appears from all angles to create diffused, soft shadows, called ambient shadows.  
  ![Depicting_elevation](https://yingvickycao.github.io/img/Depicting_elevation.png)

- Light sources  
  In Android and iOS development, shadows occur when light sources are blocked by Material surfaces at various positions along the `z-axis`.

  Z 轴:垂直于屏幕的轴，Z 轴会让 View 产生阴影的效果.

  `Z=elevation+ translationZ`  
   想象有一束斜光投向屏幕，Z 轴值越大，离光就越近，阴影的范围就越大；Z 轴值越小，离光就越远，阴影的范围就越小。

  Z :
  z = 0,no 阴影  
   z < 0,在上一个控件下方  
   z > 0,有阴影

  `android:elevation` : Resting elevation. default value (2dp)  
   `android:translationZ` : dynamic elevation offsets (6dp)  
   Upon user input, this button increases its elevation from 2dp to 8dp

- Shadow size  
  ![shadow_size](https://yingvickycao.github.io/img/shadow_size.png)

## How to add shadow for a view

- 1 使用 9 图

# Refs

https://material.io/design/environment/elevation.html  
https://material.io/design/environment/light-shadows.html
