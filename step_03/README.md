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
        this.onChangeHandler = this.onChangeHandler.bind(this);
    } 

    onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
    }

    render() {
        return <input onChange={this.onChangeHandler} .../>
    }
}
```

