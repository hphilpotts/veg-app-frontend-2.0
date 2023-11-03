export const xAuth = token => { 
    return { headers: { 'x-auth-token': token } } 
};