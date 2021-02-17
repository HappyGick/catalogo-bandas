import express from 'express';
import { getBandDetail, getBandList } from '../modules/catalog/catalog';
import { fetchImageById, imageExists } from '../modules/catalog/images';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('success');
});

router.get('/get-list', async (req, res) => {
    try {
        let list = await getBandList();
        res.status(200).send({ "band_list": list });
    } catch (e) {
        console.log(e);
        res.status(500).send("error: check logs");
    }
});

router.post('/get-images', (req, res) => {
    let images: {[id: string]: string} = {};
    try {
        for (let i = 0; i < req.body.imageids.length; ++i) {
            let imgid = req.body.imageids[i];
            if(imageExists(imgid)) images[imgid] = fetchImageById(imgid).toString('base64');
        }
        res.status(200).send({"imageData": images});
    } catch (e) {
        console.log(e);
        res.status(500).send("error: check logs");
    }

});

router.get('/get-detail/:bandid', async (req, res) => {
    try {
        let detail = await getBandDetail(parseInt(req.params.bandid));
        res.status(200).send({bandDetail: detail})
    } catch (e) {
        console.log(e);
        res.status(500).send("error: check logs");
    }

});

router.post('/add-band', (req, res) => {

});

router.delete('/remove-band/:bandid', (req, res) => {

});

export default router;