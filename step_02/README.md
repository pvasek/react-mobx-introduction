# Step 2

Implement load callback. Use _restService_ to load data which should be passed as props to _PersonDetail_.

## React service
This service is completely mocked. But there is delay between it returns data (200ms).

 ```
 restService.get(entity: string, id: string): Promise<any>
 ``` 
 
 Example: 
 ```
 restService.get('Person', '1').then(person => {
     // do whatever you want with person data
 });
```


## Hints
- you need to use state on App component
- you can handle not assigned person by returning subpart of component from PersonDetail
- you can ignore warning about using onChange, or defaultValue instead of value