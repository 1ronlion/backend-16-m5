
const cors = (req, res, next) => {

    res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Replace * with your desired origin(s) or keep it as * to allow all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){

        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200)

    }

    next()

}

export default cors