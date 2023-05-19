# Dialogs

# 1. [AlertDialog](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/other_ui/AlertDialog.md)


# 2. [DatePickerDialog](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/other_ui/DatePickerDialog_TimePickerDialog.md)

# 3. [TimePickerDialog](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/other_ui/DatePickerDialog_TimePickerDialog.md)

# 4. DialogFragment

## Why use DialogFragment instead of Dialog?   
- use a DialogFragment as a container for your dialog. The DialogFragment class provides all the controls you need to create your dialog and manage its appearance, instead of calling methods on the Dialog object.  
A fragment that displays a dialog window, floating on top of its activity's window.    
This fragment contains a Dialog object, which it displays as appropriate based on the fragment's state.

- Using DialogFragment to manage the dialog ensures that it correctly handles lifecycle events such as when the user presses the Back button or rotates the screen. 
- The DialogFragment class also allows you to reuse the dialog's UI as an embeddable component in a larger UI, just like a traditional Fragment (such as when you want the dialog UI to appear differently on large and small screens).

## API Level
added with Android 3.0 (API level 11)
- Use Support Library:Android `>=` 1.6, `android.support.v4.app.DialogFragment`
- If min version app supports is API `>=` 11, framework version of DialogFragment, `android.app.DialogFragment`

## Creating a Dialog Fragment
extending DialogFragment and creating a AlertDialog in the onCreateDialog()

Depending on how complex your dialog is, you can implement a variety of other callback methods in the DialogFragment, including all the basic fragment lifecycle methods.

## Building an Alert Dialog
- Title  
This is optional and should be used only when the content area is occupied by a detailed message, a list, or custom layout.  
If you need to state a simple message or question (such as the dialog in figure 1), you don't need a title.

- Content area  
display a message, a list, or other custom layout

- Action buttons  
<= 3

Figure 1. A dialog with a message and two action buttons.
![Figure 1. A dialog with a message and two action buttons.](https://developer.android.google.cn/images/ui/dialog_buttons.png)

Figure 2. The layout of a dialog.  
![Figure 2. The layout of a dialog.](https://developer.android.google.cn/images/ui/dialogs_regions.png)

## Adding a list
By default, touching a list item dismisses the dialog, unless you're using one of the following persistent choice lists.   
Because the list appears in the dialog's content area, the dialog cannot show both a message and a list.   
Should set a title for the dialog with setTitle().   

**There are 4 kinds of lists available with the AlertDialog APIs**
- A traditional single-choice list  
Android，setItems().  

    Figure 3. A dialog with a title and list.  
![Figure 3. A dialog with a title and list.](https://developer.android.google.cn/images/ui/dialog_list.png)

- A persistent single-choice list (radio buttons)   
Android，setSingleChoiceItems()  

- A persistent multiple-choice list (checkboxes)   
Android，setMultiChoiceItems()  
    ![Figure 4. A list of multiple-choice items.](https://developer.android.google.cn/images/ui/dialog_checkboxes.png)

- A specifying items  list   
Custom，setAdapter  

## Creating a Custom Layout  
`AlertDialog.Builder.setView()`    

Figure 5. A custom dialog layout.  
![Figure 5. A custom dialog layout.](https://developer.android.google.cn/images/ui/dialog_custom.png)

Tip: 
> If you want a custom dialog, you can instead display an Activity as a dialog instead of using the Dialog APIs. Simply create an activity and set its theme to Theme.Holo.Dialog in the <activity> manifest element:

```
<activity android:theme="@android:style/Theme.Holo.Dialog" >
```

## Passing Events Back to the Dialog's Host
event  `->` activity or fragment that opened the dialog

## Showing a Dialog
```
DialogFragment newFragment = new MyDialogFragment();
newFragment.show(getSupportFragmentManager(), "tag"); // tag = findFragmentByTag()
```
## Showing a Dialog as  as an Embedded Fragment(Fullscreen)
- cannot use AlertDialog.Builder or other Dialog objects to build the dialog in this case
- If want the DialogFragment to be embeddable, must define the dialog's UI in a layout, then load the layout in the onCreateView() callback.

```
Large Screen: an Embedded Fragment(Fullscreen)
Small Screen: Dialog
```

## Showing an activity as a dialog on large screens
To show an activity as a dialog only when on large screens, apply the Theme.Holo.DialogWhenLarge theme to the <activity> manifest element:
```
<activity android:theme="@android:style/Theme.Holo.DialogWhenLarge" >
```
## Dismissing a Dialog

### Dismissing a Dialog（Finish Operation）  
When the user touches any of the action buttons created with an AlertDialog.Builder, the system dismisses the dialog for you.    
The system also dismisses the dialog when the user touches an item in a dialog list, except when the list uses radio buttons or checkboxes. Otherwise, you can manually dismiss your dialog by calling dismiss() on your DialogFragment.

### cancel a dialog（No Operation）  
This is a special event that indicates the user explicitly left the dialog without completing the task. 
- Case 1 : presses the Back button
- Case 2 : touches the screen outside the dialog area
- Case 3 : explicitly call cancel() on the Dialog (such as in response to a "Cancel" button in the dialog).

Note: 
- The system calls onDismiss() upon each event that invokes the onCancel() callback. 
- However, if you call Dialog.dismiss() or DialogFragment.dismiss(), the system calls onDismiss() but not onCancel(). So you should generally call dismiss() when the user presses the positive button in your dialog in order to remove the dialog from view.

#### Show as a Dialog
```
onAttach: 
onCreate: 
onCreateDialog:  // Dialog
onCreateView: 
onViewCreated: 
onStart: 
onResume: 

onCancel:   // Dialog
onDismiss:  // Dialog
/
onDismiss:  // Dialog

onPause: 
onStop: 
onDestroyView: 
onDestroy: 
onDetach: 
```

Notes:
-  When Click white space / Press Back， system dimisses dialog
```
onCancel: // Thread main
onDismiss: // Thread main
```
-  Manually invork `dimiss()`, system dimisses dialog
```
onDismiss:
```

- AlertDialog Click OK btn, system dimisses dialog
```
onDismiss:
```

- AlertDialog Click Cancel btn,Manually invork `Dialog.cancel()`, system  dimisses dialog
```
onCancel:
onDismiss:
```

- `dismiss()`  vs `cancel()`  
`dismiss()`: DialogFragment, Dialog  
`cancel()`:  Dialog , but DialogFragment disable to invork. 


In a word, when do some work before system dismiss dialog, use `dimiss()`, not `cancel()`

#### Show as an embedded Fragment

```
onAttach: 
onCreate: 
onCreateView: 
onViewCreated: 
onStart: 
onResume: 

onPause: 
onStop: 
onDestroyView: 
onDestroy: 
onDetach: 
```

## monitor user press back?
```
getDialog().setOnKeyListener((dialog1, keyCode, event) -> {
    if (keyCode == KeyEvent.KEYCODE_BACK && KeyEvent.ACTION_DOWN == event.getAction()) {
        dismiss();
        return true;
    } else {
        return false;
    }
});
```
# Refs
- https://developer.android.google.cn/guide/topics/ui/dialogs
- https://developer.android.google.cn/reference/androidx/fragment/app/DialogFragment.html
- https://developer.android.google.cn/reference/android/app/DialogFragment.html