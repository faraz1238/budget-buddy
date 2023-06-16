
export function getUsers() {
    let users = localStorage.getItem('users')
    if (users) {
        return(JSON.parse(users))
        
    }
    else {
        return []
    }
}
export function getCurrentUser() {
    let currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
        return(JSON.parse(currentUser))
        
    }
    else {
        return []
    }
}
export function getData() {
    let data = localStorage.getItem('data')
    if (data) {
        return(JSON.parse(data))
        
    }
    else {
        return []
    }
}
export function getSavings() {
    let savings = localStorage.getItem('savings')
    if (savings) {
        return (JSON.parse(savings));
        
    }
    else {
        return 0;
    }
}

