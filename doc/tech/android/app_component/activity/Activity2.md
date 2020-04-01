- `android:alwaysRetainTaskState`  
  标记应用的 task 是否保持原来的状态.  
  “true”表示总是保持，“false”表示不能够保证，默认为“false”。  
  此属性只对 task 的根 Activity 起作用，其他的 Activity 都会被忽略。  
  默认情况下，如果一个应用在后台呆的太久例如 30 分钟，用户从主选单再次选择该应用时，系统就会对该应用的 task 进行清理，除了根 Activity，其他 Activity 都会被清除出栈.但是如果在根 Activity 中设置了此属性之后，用户再次启动应用时，仍然可以看到上一次操作的界面。  
  这个属性对于一些应用非常有用，例如 Browser 应用程序，有很多状态，比如打开很多的 tab，用户不想丢失这些状态，使用这个属性就极为恰当。

- `android:clearTaskOnLaunch`  
  标记是否从 task 清除除根 Activity 之外的所有的 Activity.  
  “true”表示清除，“false”表示不清除，默认为“false”。  
  这个属性也只对根 Activity 起作用，其他的 Activity 都会被忽略。  
  如果设置了这个属性为“true”，每次用户重新启动这个应用时，都只会看到根 Activity，task 中的其他 Activity 都会被清除出栈。

- `android:allowTaskReparenting`  
  标记一个 Activity 实例在当前应用退居后台后，是否能从启动它的那个 task 移动到有共同 affinity 的 task.  
  “true”表示可以移动，“false”表示它必须呆在当前应用的 task 中，默认值为 false。  
  如果一个这个 Activity 的元素没有设定此属性，设定在上的此属性会对此 Activity 起作用。例如在一个应用中要查看一个 web 页面，在启动系统浏览器 Activity 后，这个 Activity 实例和当前应用处于同一个 task，当我们的应用退居后台之后用户再次从主选单中启动应用，此时这个 Activity 实例将会重新宿主到 Browser 应用的 task 内，在我们的应用中将不会再看到这个 Activity 实例，而如果此时启动 Browser 应用，就会发现，第一个界面就是我们刚才打开的 web 页面，证明了这个 Activity 实例确实是宿主到了 Browser 应用的 task 内。

- `android:autoRemoveFromRecents`  
  activity 执行 onDestroy()后，是否从 Recenet 中自动删掉。  
  true：自动删除。 fase，不，默认是 false。

  经典场景：
  Video Page -> PIP -> Video page,   此时 Vide page 在 Recent 是单独的 task。  
  true：finish Video page 后，Recent 中也自动删除。  
  false：finish Video page 后，Recent 中仍然存在。单击 Recent，Video Page 是白屏，或重新执行 onCreate()
