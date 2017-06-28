function returnWithDelay<T>(data: T, delay: number = 200): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });     
}

const data = {
    Country: [
        {
            Id: '1',
            Code: 'USA',
        }
    ],
    Person: [
        {
            Id: '1',
            FirstName: 'Michael',
            LastName: 'Jordan',
            Country: {
                Id: '1',
                Code: 'USA'
            }
        }
    ]
}

export const restService = {
    
    getList(entity: string): Promise<any[]> {
        const list = data[entity];
        if (list) {
            return returnWithDelay(list);
        }        
        throw new Error('The rest service support only the following entities: Country, Person');
    },

    get(entity: string, id: string): Promise<any> {
        const list = data[entity];
        if (list) {
            const item = list.find(i => i.Id === id);
            if (item) {
                return returnWithDelay(item);
            }
        }        
        throw new Error('The rest service support only the following entities: Country, Person');
    }
}