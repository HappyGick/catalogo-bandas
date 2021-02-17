import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('success');
});

router.get('/get-list', (req, res) => {

});

router.post('/get-images', (req, res) => {

});

router.get('/get-detail/:bandid', (req, res) => {

});

router.post('/add-band', (req, res) => {

});

router.delete('/remove-band', (req, res) => {

});

export default router;