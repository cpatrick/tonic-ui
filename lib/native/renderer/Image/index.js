import MouseHandler    from '../../../interaction/MouseHandler';
import * as sizeHelper from '../../../util/SizeHelper';

export default class NativeImageRenderer {

    constructor(domElement, imageProvider, mouseListeners = null) {
        this.size = sizeHelper.getSize(domElement);
        this.container = domElement;
        this.canvas = document.createElement("canvas");
        this.image = new Image();
        this.fps = '';
        this.subscriptions = [];
        this.imageProvider = imageProvider;

        this.image.onload = () => {
            this.ctx.drawImage(this.image, 0, 0);
            this.ctx.textBaseline = "top";
            this.ctx.textAlign = "left";
            this.ctx.fillText(this.fps, 5, 5);
        };

        // Update DOM
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = "30px Arial";

        // Attach mouse listener if needed
        if(mouseListeners) {
            this.mouseHandler = new MouseHandler(this.canvas);
            this.mouseHandler.attach(mouseListeners);
        }

        // Add image listener
        this.subscriptions.push(imageProvider.onImageReady( (data, envelope) => {
            this.image.src = data.url;
            this.fps = data.fps + ' fps';
        }));

        // Add size listener
        this.subscriptions.push(sizeHelper.onSizeChange( ()=> {
            this.size = sizeHelper.getSize(domElement);
            this.canvas.setAttribute("width",  this.size.clientWidth);
            this.canvas.setAttribute("height", this.size.clientHeight);
        }));
        sizeHelper.startListening();
    }

    destroy() {
        while(this.subscriptions.length) {
            this.subscriptions.pop().unsubscribe();
        }

        if(this.mouseHandler) {
            this.mouseHandler.destroy();
            this.mouseHandler = null;
        }

        this.container = null;
        this.imageProvider = null;
    }
}