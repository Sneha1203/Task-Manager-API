const express = require('express');
const app = express();
const port = 3000

app.get('/hello', (request, response) => {
    response.send('Task Manager App');
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
} )


