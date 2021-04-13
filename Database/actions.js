const loginCheck = (email,password) => {
    if(!email) return {status: 'err', error: 'No email entered'}
    if(!password) return {status: 'err', error: 'Password field empty'}
}

const registerCheck = (email,username,password,confirm) => {
    if(!email) return {status: 'err', error: 'No email entered'}
    if(!username) return {status: 'err', error: 'No username entered'}
    if(!password) return {status: 'err', error: 'Password field empty'}
    if(!confirm) return {status: 'err', error: 'Password field empty'}
}

const login = async (email, password) => {
    const fields = loginCheck(email, password);
    if(fields) return fields

    try {
        let req = await auth.signInWithEmailAndPassword(email, password)
        return {status: 'ok'}
    } catch (error) {
        return {status: 'err', error: 'Invalid email or password'}
    }
}

const registerUser = async (email, username, password, confirm) => {
    const fields = registerCheck(email, username, password, confirm);
    if(fields) return fields
    
    let check = await db.collection('users').where('username','==',username).get()

    if(password.length < 6) {
        return {status: 'err', error: 'Password must be at least 6 characters'}
    }
    if(password != confirm) {
        return {status: 'err', error: 'Your passwords do not match'}
    }
    if(check.docs.length > 0) {
        return {status: 'err', error: 'A player with that username already exists'}
    }
    try {
        let create = await auth.createUserWithEmailAndPassword(email.toLowerCase(), password)
        await db.collection('users').doc(email).set({
            username,
            score: 0,
            tickets: 0
        })
    } catch(e) {
        return {status: 'err', error: 'A player with that email already exists'}
    }
    return {status: 'ok'}
}



const resetPassword = async (email) => {
    try {
        let req = await auth.sendPasswordResetEmail(email)
        return {status: 'ok'}
    } catch (error) {
        return {status: 'err', error: 'Something went wrong'}
    }
}