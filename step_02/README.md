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
- you can handle not assigned person by returning 'Not loaded' instead

## Optional chalanges
- make load automatic