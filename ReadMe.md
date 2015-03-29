How to launch
========================
type bellow command in cmd or terminal or git bash
> node run

open browser at localhost:3000 or http://127.0.0.1:3000/#/4


Requirements:
======================================
● Compatibility on mobile browsers is expected
● No thirdparty
JavaScript libraries
● No need to make the UI pretty (e.g., no bootstrap)
1. Given a number suffixed in a URL, make a grid of size n, and render it in HTML. No
restrictions on the URL format.
e.g.,
http://127.0.0.1/#/4
2. Tapping on an empty grid square adds an 'x' to it. Tapping once more removes the 'x'.

3. Make x's draggable from their grid square to any other grid squares within the grid. If an x
is draganddropped
to a grid square already containing an x, the draganddrop
action is
cancelled.
4. Make the positions of all x’s sync in other browsers/tabs with the same URL from Step 1.
No restrictions on the backend platform.

Stack used:
========================================
Firebase for browser synch and data storage
Vanilla javascript

Functionality:
=================================================
render():
	renders the grid

create():
	creates dynamic row to hold blocks together --> createRow()
	creates blocks to hold the "x" item --> createSquare()

renderState():
	displays "X" when user clicks, with a dark background to understand the effect
	upates the boolean value state.value in firebase to have synchronous effect on all browser

setState():
	upates firebase

allowDrop():
	prevents default browser action and allows to drop

drag():
	allows the element to be dragged

setDragElement():
	to remove the element if its dragable from the origin element by setting state.value to 0

drop():
	allows the element to be dropped at targeted element
	removes id from dragged element to avoid duplicate id
	set id of dragged element to the target eleme
