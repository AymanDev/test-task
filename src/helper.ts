export const getTimedResponse = async <T>(response: T) => {
    return new Promise<T>(resolve => {
        setTimeout(() => resolve(response), 3000);
    });
};
