# Step 4

Add the following validations:
- first name - required
- last name - required

The `IPersonDetailState` and validation method `isRequired` is prepared for you.
The `error` css class is ready to make your errors red.

## Hints
- use state to include validation errors for particular fields
- in onChange callbacks validate fields and set the errors to the state

__Example how to render string array:__

```
    render() {
        return (
            <ul>
                {this.props.stringArray.map(i => <li>{i}</li>)}
            </ul>
        );
    }
```

You will need to use PersonDetail props which will be initalized to the person property which is passed to it:
That means you will need the following code in `PersonDetail` component
```
    componentWillReceiveProps(nextProps: IPersonDetailProps) {
        this.setState(nextProps.person);
    }
```