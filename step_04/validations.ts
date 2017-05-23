export const maxLength = (value) => {
    if(value.length > 16){
        return ['Write max 16 characters'];
    }
    return [];
}

export const isRequired =  (value) => {
    if (!value || value === '') {
        return ['Field is required'];
    }
    return [];
};
