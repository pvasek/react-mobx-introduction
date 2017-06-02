# Golf Shots
Web application created in React, TypeScript and Mobx.    
Usable for mapping golf shots.

## Structre
### App.tsx
* Returns 2 components - MapCOmponent (left part with a map) and ShoList (form for editing shots).
* There is static instance of property offSet (positioning in absolute xy)
* Instance of shotListModel (contains all shots)

### DataModel.tsx
* There are all interfaces of data (objects)

### LoadData.tsx
* Gets response from url (in this case it is MapsHoleMap.json)
    
### ShotList.tsx
* Component with form
* Contains adding, editing, deleting shots and moving shots with mouse
* Contains ShotModel (contains from and to properties) and PointModel (contains x and y properties)

### MapComponent.tsx
* Creating and holding an instance of Data from LoadData.tsx
* Returns ZoomableComponent with children
    * LineGrid
    * Areas
    * PointGrid
    * ShotCoponent[]

### ShotComponent.tsx
* Returns SVG Path of shot

### Areas.tsx
* Creates all Areas (polygons) and add them className

### LineGrid.tsx
* Returns rectangle with square pattern

### PointGrid.tsx
* Return rectangle with point pattern
* Returns numbering (0 1 2 ... + A B C D .. AA AB ...)
* Returns sectors

### ZoomableComponent.tsx
* Creates viewBox for areas with mouse events
* Creates navigation menu with minimap and zooming

## Conclusion
* While zooming disappers grid patterns (when the window size is reduced it works again) + best performance.
* In FireFox disappears everything exept numbering shots.
* In MS Edge disappears everithing on initial zoom + slow.