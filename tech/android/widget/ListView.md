# ListView

## Force scroll
```
ListView.setOnTouchListener((v, event) -> {
            if (event.getAction() == MotionEvent.ACTION_MOVE) {
                Log.d(TAG, "onTouch: ACTION_MOVE");
                return true;
            }
            return false;
        });
```