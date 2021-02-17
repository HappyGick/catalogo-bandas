import express from 'express';
import { BandDetail } from '../interfaces/catalog';
import { BandDetailRequestTemplate } from '../interfaces/requests';
import { addBand, deleteBand, getAllGenres, getBandDetail, getBandList } from '../modules/catalog/catalog';
import { fetchImageById, imageExists, uploadImage } from '../modules/catalog/images';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('success');
});

router.get('/get-genre-list', async (req, res) => {
    try {
        let list = await getAllGenres();
        res.status(200).send({"genre_list": list});
    } catch (e) {
        console.log(e);
        res.status(500).send("error: check logs");
    }
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

router.post('/add-band', async (req, res) => {
    try {
        let bandSkeleton: BandDetailRequestTemplate = req.body.bandInfo;
        let imgid: string = uploadImage(Buffer.from(bandSkeleton.imagedata, 'base64'));
        let bandDetail: BandDetail = {
            name: bandSkeleton.name,
            genres: bandSkeleton.genres,
            active: bandSkeleton.active,
            members: bandSkeleton.members,
            samplevids: bandSkeleton.samplevids,
            imgid,
            exmembers: bandSkeleton.exmembers
        };
        let fullBandDetail = await addBand(bandDetail);

        res.status(200).send({
            fullBandDetail,
            imgdata: {
                id: imgid,
                contents: bandSkeleton.imagedata
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("error: check logs");
    }
});

router.delete('/remove-band/:bandid', async (req, res) => {
    try {
        await deleteBand(parseInt(req.params.bandid));
        res.status(200).send("success");
    } catch (e) {
        console.log(e);
        res.status(500).send("error: check logs");
    }
});

export default router;