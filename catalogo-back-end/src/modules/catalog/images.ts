import fs from 'fs';
import crypto from 'crypto';

export function imageExists(id: string): boolean {
    return fs.existsSync('./db/images/' + id + '.jpg');
}

export function fetchImageById(id: string): Buffer {
    return fs.readFileSync('./db/images/' + id + '.jpg');
}

export function uploadImage(image: Buffer): string {
    let fileList = fs.readdirSync('./db/images');
    let randomid : string;
    
    do {
        randomid = crypto.randomBytes(32).toString('hex');
    } while (fileList.includes(randomid + '.jpg'));

    fs.writeFile('./db/images/' + randomid + '.jpg', image, (err) => {
        if (err) throw err;
    });

    return randomid;
}

export function deleteImage(id: string) {
    fs.rmSync('./db/images/' + id + '.jpg');
}

export function isJPEG(image: Buffer): boolean {
    return (image[0] === 0xff) && (image[1] === 0xd8) && (image[2] === 0xff);
}