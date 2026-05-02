async function getToken() {
    try {
        const response = await fetch('http://20.207.122.201/evaluation-service/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "ramkrishna@abc.edu",
                name: "ram krishna",
                rollNo: "aa1bb",
                accessCode: "QkbpxH",
                clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
                clientSecret: "tVjaaaRBSeXcRXeM"
            })
        });
        const data = await response.json();
        console.log('--- NEW TOKEN ---');
        console.log(data.access_token || data);
    } catch (err) {
        console.error('Failed to get token:', err.message);
    }
}

getToken();
