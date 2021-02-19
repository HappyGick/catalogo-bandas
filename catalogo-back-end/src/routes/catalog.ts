import express from 'express';
import { BandDetail } from '../interfaces/catalog';
import { BandDetailRequestTemplate } from '../interfaces/requests';
import { addBand, deleteBand, getAllGenres, getBandDetail, getBandList } from '../modules/catalog/catalog';
import { fetchImageById, imageExists, uploadImage, isJPEG } from '../modules/catalog/images';
import path from 'path';

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

router.get('/get-image/:imgid', (req, res) => {
    try {
        if(imageExists(req.params.imgid))
            res.status(200).sendFile(path.resolve(__dirname + '/../../db/images/' + req.params.imgid + '.jpg'));
        else
            res.status(400).send("image does not exist");    
    } catch (e) {
        console.log(e);
        res.status(500).send("error: check logs");
    }

});

router.get('/get-detail/:bandid', async (req, res) => {
    try {
        let detail = await getBandDetail(parseInt(req.params.bandid));
        let convertedvideos: string[] = [];
        for(let i in detail.samplevids) {
            let splitlink = detail.samplevids[i].split('/');
            if(splitlink.includes('youtu.be')) {
                convertedvideos.push('https://youtube.com/embed/' + splitlink[splitlink.length - 1]);
            } else {
                convertedvideos.push('https://youtube.com/embed/' + splitlink[splitlink.length - 1].split('=')[1]);
            }
        }
        detail.samplevids = convertedvideos;
        res.status(200).send({bandDetail: detail})
    } catch (e) {
        console.log(e);
        res.status(500).send("error: check logs");
    }

});

router.post('/add-band', async (req, res) => {
    try {
        let bandSkeleton: BandDetailRequestTemplate = req.body.bandInfo;
        let imgbuffer: Buffer = Buffer.from(bandSkeleton.imagedata, 'base64');
        if(!isJPEG(imgbuffer)) {
            res.status(400).send('Image is not JPEG');
            return;
        }
        let imgid: string = uploadImage(imgbuffer);
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