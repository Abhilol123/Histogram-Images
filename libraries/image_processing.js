class ImageProcess {
    constructor() {
        this.filter1 = [[0, -1, 0], [-1, 4, -1], [0, -1, 0]];
        this.filter2 = [[1, 0, -1], [1, 0, -1], [1, 0, -1]];
        this.filter3 = [[1, 1, 1], [0, 0, 0], [-1, -1, -1]];
        this.filter4 = [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]];
        this.filter5 = [[0, 0, 0], [-1, 1, 0], [0, 0, 0]];
        this.filter6 = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
    }

    static convolution(image, x, y, filter, factor) {
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                let index = ((x + k) + (y + l) * image.width) * 4;
                let mult = filter[l][k] * factor;
                sumR = sumR + (image.pixels[index + 0] * mult);
                sumG = sumG + (image.pixels[index + 1] * mult);
                sumB = sumB + (image.pixels[index + 2] * mult);
            }
        }
        let out = {
            r: floor(sumR),
            g: floor(sumG),
            b: floor(sumB)
        }
        return out;
    }

    static operate(master_image, filter, factor) {
        master_image.loadPixels();
        let new_image = createImage(master_image.width, master_image.height);
        new_image.loadPixels();
        for (let j = 0; j < master_image.height - 2; j++) {
            for (let i = 0; i < master_image.width - 2; i++) {
                let index = (i + j * master_image.width) * 4;
                let rgb = ImageProcess.convolution(master_image, i, j, filter, factor);
                new_image.pixels[index + 0] = rgb.r;
                new_image.pixels[index + 1] = rgb.g;
                new_image.pixels[index + 2] = rgb.b;
                new_image.pixels[index + 3] = 255;
            }
        }
        new_image.updatePixels();
        return new_image;
    }

    static merge_images(image1, image2) {
        let new_image = createImage(image1.width, image1.height);
        new_image.loadPixels();
        for (let j = 0; j < new_image.height; j++) {
            for (let i = 0; i < new_image.width; i++) {
                let index = (i + j * image1.width) * 4;
                new_image.pixels[index + 0] = image1.pixels[index + 0] + image2.pixels[index + 0];
                new_image.pixels[index + 1] = image1.pixels[index + 1] + image2.pixels[index + 1];
                new_image.pixels[index + 2] = image1.pixels[index + 2] + image2.pixels[index + 2];
                new_image.pixels[index + 3] = 255;
            }
        }
        new_image.updatePixels();
        return new_image;
    }

    static hitogram(image) {
        let hist = {
            r: [],
            g: [],
            b: [],
            t: []
        };
        for (let i = 0; i < 256; i++) {
            hist.r.push({ x: i, y: 0 });
            hist.g.push({ x: i, y: 0 });
            hist.b.push({ x: i, y: 0 });
            hist.t.push({ x: i, y: 0 });
        }
        image.loadPixels();
        for (let j = 0; j < image.height; j++) {
            for (let i = 0; i < image.width; i++) {
                let index = (i + j * image.width) * 4;
                hist.r[image.pixels[index + 0]].y += 1;
                hist.g[image.pixels[index + 1]].y += 1;
                hist.b[image.pixels[index + 2]].y += 1;
                hist.t[image.pixels[index + 3]].y += 1;
            }
        }
        return hist;
    }

    histogramOrientedGradients(image) {
        return image;
    }
}
