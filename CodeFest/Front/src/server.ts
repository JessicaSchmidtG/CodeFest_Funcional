import express from 'express';
const app = express();

app.get('/users', (req: any, res: any) => {
    const data = req.body;
    res.send(data);
});

app.listen(3000, () => {
    console.log('Server running ', 3000);
});