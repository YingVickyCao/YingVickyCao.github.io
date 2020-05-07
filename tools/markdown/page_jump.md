# Inner page jump in MarkDown

# 1 Rule

```
// Recommended
<span id="jump">跳转到的地方</span>

// Click
[点击跳转](#jump)
<a href="#jump">点击跳转</a>
```

```
// Recommended
<h1 id="2">2 标题</h1>
<h2 id="2.1">2.1 标题</h2>

// Click
[2 标题](#2)
[2.1 标题](#2.1)

<a href="#2">2 标题</a>
<a href="#2.1">2.1 标题</a>
```

```
# 2 标题
## 2.1 标题

// Click
[2 标题](#2-标题)
[2.1 标题](#21-标题)

<a href="#2-标题">2 标题</a>
<a href="#21-标题">2.1 标题</a>
```

# 2 Principle

```
## 123
=>
<h2 data-source-line="5" id="123">
    <a class="markdownIt-Anchor" href="#123"></a>
    123
</h2>
```

```
[显示的内容](#标号)
[1.3 强调](#1.3)
=>
<a href="#1.3">1.3 强调</a>
```

```
## 2.1 标题
=>
<h2 data-source-line="2" id="21-标题">
    <a class="markdownIt-Anchor" href="#21-标题"></a>
    2.1 标题
</h2>
```

```
<h2 id="1.3">2.2 标题</h2>
=>
<h2 id="1.3">2.2 标题</h2>
```

# 3 Sample

## 2.1 标题

- <a href="#1.1">1 标题</a>
  - <a href="#1.1">1.1 标题</a>
  - [1.2 标题](#1.2)

<h1 id="1">1 标题</h1>
<h2 id="1.1">1.1 标题</h2>
<h2 id="1.2">1.2 标题</h2>

- [2 标题](#2-标题)

  - [2.1 标题](#21-标题)
  - [2.2 标题](#22-标题)

- [maven 坐标系](../maven/Maven.md#maven_coordinate)

# 2 标题

## 2.1 标题

## 2.2 标题

# Refs

- https://github.com/woaiwojia321314/woaiwojia321314.github.io/blob/master/README.md
