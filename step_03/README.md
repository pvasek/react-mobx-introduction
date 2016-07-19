# Step 3

Use component state to make the editing working.

## Hints
- you need to use state on App component
- use onChange input events to get the changes

_Example how to use onChange handler:_

```
class MyComponent extends Component<any, any> {
    constructor() {
        super();
        // this is neccessary in order to assign it directly in render
        this.onChangeHandler = this.onChangeHandler.bind(this);
    } 

    onChangeHandler(e: KeyboardEvent) {
        const value = (e.target as HTMLInputElement).value;
    }

    render() {
        return <input onChange={this.onChange} .../>
    }
}
```

