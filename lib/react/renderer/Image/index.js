var React = require('react'),
    ReactDOM = require('react-dom'),
    ContentEditable = require('../../widget/ContentEditable'),
    MouseHandler = require('../../../interaction/MouseHandler'),
    sizeHelper = require('../../../util/SizeHelper'),
    ImageExporter = require('../../../util/ImageExporter');

// Load style
require('./style.css');

function onImageLoaded() {
    var image = this;

    if(image.drawToCanvas) {
        if(image.firstRender) {
            image.firstRender = false;
            image.component.resetCamera()
        } else {
            image.drawToCanvas();
        }
    }
}

function drawToCanvasAsImage() {
    var image = this,
        component = this.component,
        canvas = ReactDOM.findDOMNode(component.refs.canvasRenderer),
        ctx = canvas.getContext('2d'),
        w = component.state.width,
        h = component.state.height,
        iw = image ? image.width  : 500,
        ih = image ? image.height : 500,
        zoomLevel = component.zoom,
        drawingCenter = component.center;

    ctx.clearRect(0, 0, w, h);

    var tw = Math.floor(iw * zoomLevel),
        th = Math.floor(ih * zoomLevel),
        tx = (w * drawingCenter[0]) - (tw / 2),
        ty = (h * drawingCenter[1]) - (th / 2);

    image.activeArea = [tx, ty, tw, th];

    try {
        ctx.drawImage(
            image,
            0,   0, iw, ih,  // Source image   [Location,Size]
            tx, ty, tw, th); // Target drawing [Location,Size]
    } catch (err) {
    }
}

function drawToCanvasAsBuffer() {
    // canvas: this.bgCanvas.el,
    // area: [0, 0, width, height],
    // outputSize: [destWidth, destHeight],
    // crosshair: [lineX * scaleX, lineY * scaleY],
    // type: this.renderMethod

    var image = this,
        data = this.data,
        component = this.component,
        destCanvas = ReactDOM.findDOMNode(component.refs.canvasRenderer),
        ctx = destCanvas.getContext('2d'),
        w = component.state.width,
        h = component.state.height,
        iw = data.outputSize[0],
        ih = data.outputSize[1],
        zoomLevel = component.zoom,
        drawingCenter = component.center;

    ctx.clearRect(0, 0, w, h);

    var tw = Math.floor(iw * zoomLevel),
        th = Math.floor(ih * zoomLevel),
        tx = (w * drawingCenter[0]) - (tw / 2),
        ty = (h * drawingCenter[1]) - (th / 2);

    try {
        ctx.drawImage(
            data.canvas,
            data.area[0], data.area[1], data.area[2], data.area[3], // Source image   [Location,Size]
            tx, ty, tw, th); // Target drawing [Location,Size]

        image.activeArea = [tx, ty, tw, th];

        var scale = [ tw / data.area[2], th / data.area[3] ],
            translate = [ tx, ty ];

        if(data.crosshair) {
            ctx.beginPath();

            ctx.moveTo(translate[0] + scale[0] * data.crosshair[0], 0);
            ctx.lineTo(translate[0] + scale[0] * data.crosshair[0], h);

            ctx.moveTo(0, translate[1] + scale[1] * data.crosshair[1]);
            ctx.lineTo(w, translate[1] + scale[1] * data.crosshair[1]);

            ctx.strokeStyle = component.props.crosshairColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    } catch (err) {
    }
}

/**
 * This React component expect the following input properties:
 *   - minZoom:
 *       Default value is 0.1
 *   - maxZoom:
 *       Default value is 10
 *   - crosshairColor:
 *       Default value is '#000'
 *
 * Available methods:
 *   - renderImage({url: imageURL})
 *   - renderCanvas({ outputSize: [width, height], canvas: canvasDomElement, area: [x,y,width,height], crosshair: [x,y]})
 *   - resetCamera()
 */
export default React.createClass({

    propTypes: {
        imageBuilder: React.PropTypes.object,
        minZoom: React.PropTypes.number,
        maxZoom: React.PropTypes.number,
        crosshairColor: React.PropTypes.string,
        modifiers: React.PropTypes.array,
        pressRadius: React.PropTypes.number,
        listener: React.PropTypes.object
    },

    getInitialState() {
        var metadata = this.props.imageBuilder ? this.props.imageBuilder.queryDataModel.originalData.metadata || {} : {},
            title = metadata.title || 'No title',
            description = metadata.description || 'No description';
        return { width: 200, height: 200, dialog: false, title, description };
    },

    getDefaultProps() {
        return { minZoom: 0.1, maxZoom: 10, crosshairColor: '#000', modifiers: [0, 2], pressRadius: 50 };
    },

    componentWillMount() {
        this.imageToDraw = new Image();

        // Monitor image builder
        if(this.props.imageBuilder) {
            this.imageBuilderSubscription = this.props.imageBuilder.onImageReady((data, envelope) => {
                if(data.url) {
                    this.renderImage(data);
                } else {
                    this.renderCanvas(data);
                }
            });
        }

        // Shared properties
        this.zoom = 1;
        this.baseZoom = 1;
        this.center = [0.5, 0.5];
        this.baseCenter = [0.5, 0.5];

        // Attach context to image
        this.imageToDraw.component   = this;
        this.imageToDraw.onload      = onImageLoaded;
        this.imageToDraw.firstRender = true;

        // Listen to window resize
        this.sizeSubscription = sizeHelper.onSizeChange(this.updateDimensions);

        // Make sure we monitor window size if it is not already the case
        sizeHelper.startListening();

        // Listen to keyDown
        document.addEventListener('keydown', this.handleKeyDown);

        // Add image exporter
        this.sendToServer = false;
        this.imageExporter = new ImageExporter();
    },

    componentWillUnmount() {
        // Remove key listener
        document.removeEventListener('keydown', this.handleKeyDown);

        // Remove listener
        if(this.imageBuilderSubscription) {
            this.imageBuilderSubscription.unsubscribe();
            this.imageBuilderSubscription = null;
        }

        // Clean image
        this.imageToDraw.onload = null;
        this.imageToDraw.drawToCanvas = null;
        this.imageToDraw.component = null;
        this.imageToDraw.data = null;
        this.imageToDraw = null;

        // Free mouseHandler
        this.mouseHandler.destroy();
        this.mouseHandler = null;

        // Remove window listener
        if(this.sizeSubscription){
            this.sizeSubscription.unsubscribe();
            this.sizeSubscription = null;
        }
    },

    updateDimensions() {
        var el = ReactDOM.findDOMNode(this).parentNode,
            elSize = sizeHelper.getSize(el);

        if(el && (this.state.width !== elSize.clientWidth || this.state.height !== elSize.clientHeight)) {
            this.setState({ width: elSize.clientWidth, height: elSize.clientHeight });
            return true;
        }
        return false;
    },

    componentDidMount() {
        this.updateDimensions();
        if(this.imageToDraw.drawToCanvas) {
            this.imageToDraw.drawToCanvas();
        }

        // Attach mouse listener
        this.mouseHandler = new MouseHandler(ReactDOM.findDOMNode(this.refs.canvasRenderer));

        // Allow modifier via press action
        if(this.props.modifiers) {
            this.mouseHandler.toggleModifierOnPress(true, this.props.modifiers);
        }

        this.mouseHandler.attach({
            'drag' : this.dragCallback,
            'zoom' : this.zoomCallback,
            'click': this.clickCallback
        });

        this.mouseHandler.on('modifier.change', (change, envelope) => {
            var image = this.imageToDraw,
                ctx = ReactDOM.findDOMNode(this.refs.canvasRenderer).getContext('2d'),
                w = this.state.width,
                h = this.state.height;

            ctx.beginPath();
            ctx.fillStyle="#ffffff";
            ctx.lineWidth = 5;
            ctx.strokeStyle="#000000";
            ctx.arc(change.event.relative.x, change.event.relative.y, this.props.pressRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke();

            setTimeout(function() {
                image.drawToCanvas();
            }, 300);
        });
    },

    componentDidUpdate(nextProps, nextState) {
        this.updateDimensions();
        if(this.imageToDraw.drawToCanvas) {
            this.imageToDraw.drawToCanvas();
        }
    },

    zoomCallback(event, envelope) {
        // Extend event with active area
        event.activeArea = this.imageToDraw.activeArea;

        // Handle mouse listener if any
        var eventManaged = false;
        if(this.props.listener && this.props.listener.zoom) {
            eventManaged = this.props.listener.zoom(event, envelope);
        }

        // Handle local zoom
        if(!eventManaged) {
            if(event.isFirst) {
                this.baseZoom = this.zoom;
            }
            var zoom = this.baseZoom * event.scale;

            if(zoom < this.props.minZoom) {
                zoom = this.props.minZoom;
            }
            if(zoom > this.props.maxZoom) {
                zoom = this.props.maxZoom;
            }

            if(this.zoom !== zoom) {
                // Update center to keep the location of the pointer the same
                var x = this.center[0],
                    y = this.center[1],
                    deltaZoom = zoom / this.zoom,
                    fixedX = event.relative.x / this.state.width,
                    fixedY = event.relative.y / this.state.height;

                this.zoom = zoom;
                this.center[0] = fixedX + deltaZoom * (x - fixedX);
                this.center[1] = fixedY + deltaZoom * (y - fixedY);

                if(this.imageToDraw.drawToCanvas) {
                    this.imageToDraw.drawToCanvas();
                }
            }

            if(event.isFinal) {
                this.baseZoom = this.zoom;
            }
        }

        // Store center
        this.baseCenter = [ this.center[0], this.center[1] ];
    },

    dragCallback(event, envelope) {
        // Extend event with active area
        event.activeArea = this.imageToDraw.activeArea;

        // Store zoom
        this.baseZoom = this.zoom;

        // Handle mouse listener if any
        var eventManaged = false;
        if(this.props.listener && this.props.listener.drag) {
            eventManaged = this.props.listener.drag(event, envelope);
        }

        // Handle drag to pan
        if(!eventManaged) {
            if(event.isFirst) {
                this.baseCenter = [ this.center[0], this.center[1] ];
            }

            var deltaX = event.deltaX / this.state.width,
                deltaY = event.deltaY / this.state.height;

            this.center[0] = this.baseCenter[0] + deltaX;
            this.center[1] = this.baseCenter[1] + deltaY;

            if(event.isFinal) {
                this.baseCenter = [ this.center[0], this.center[1] ];
            }

            if(this.imageToDraw.drawToCanvas) {
                this.imageToDraw.drawToCanvas();
            }
        }
    },

    clickCallback(event, envelope) {
        // Extend event with active area
        event.activeArea = this.imageToDraw.activeArea;

        // Handle mouse listener if any
        if(this.props.listener && this.props.listener.click) {
            this.props.listener.click(event, envelope);
        }
    },

    renderImage(data) {
        this.imageToDraw.drawToCanvas = drawToCanvasAsImage;
        this.imageToDraw.src = data.url;
    },

    renderCanvas(data) {
        this.imageToDraw.drawToCanvas = drawToCanvasAsBuffer;
        this.imageToDraw.data = data;
        this.imageToDraw.width = data.outputSize[0];
        this.imageToDraw.height = data.outputSize[1];

        // Send data to server for export
        if(this.sendToServer) {
            this.imageExporter.exportImage(data);
        }

        // No need to wait to render it
        if(this.imageToDraw.firstRender) {
            this.imageToDraw.firstRender = false;
            this.resetCamera()
        } else {
            this.imageToDraw.drawToCanvas();
        }
    },

    resetCamera() {
        var w = this.state.width,
            h = this.state.height,
            image = this.imageToDraw,
            iw = image ? image.width  : 500,
            ih = image ? image.height : 500;

        this.zoom = Math.min(w / iw, h / ih);
        this.baseZoom = Math.min(w / iw, h / ih);
        this.baseCenter = [0.5, 0.5];
        this.center = [0.5, 0.5];

        image.drawToCanvas();
    },

    recordImages(record) {
        this.sendToServer = record;
    },

    handleKeyDown(event) {
        if(event.keyCode === 82) {
            // r => reset camera
            this.resetCamera();
        } else if(event.keyCode === 85 && !this.state.dialog) {
            // u => Update dataset metadata
            var thumbnailImage = ReactDOM.findDOMNode(this.refs.thumbnail);

            if(this.imageToDraw.data.canvas.nodeName === 'CANVAS') {
                if(this.imageToDraw.data.canvas.width === this.imageToDraw.data.area[2] && this.imageToDraw.data.canvas.height === this.imageToDraw.data.area[3]) {
                    thumbnailImage.src = this.imageToDraw.data.canvas.toDataURL('image/png');
                } else {
                    // Need to extract region
                    thumbnailImage.src = this.imageExporter.extractCanvasRegion(this.imageToDraw.data.canvas, this.imageToDraw.data.area, this.imageToDraw.data.outputSize);
                }
            } else {
                // Use image URL
                thumbnailImage.src = this.imageToDraw.data.canvas.src;
            }

            this.setState({dialog : !this.state.dialog});
        }
    },

    updateTitle(event) {
        var title = event.target.value;
        this.setState({title});
    },

    updateDescription(event) {
        var description = event.target.value;
        this.setState({description});
    },

    toggleDialog() {
        this.setState({dialog : !this.state.dialog});
    },

    updateMetadata() {
        this.setState({dialog : !this.state.dialog});
        this.imageExporter.updateMetadata({
            title: this.state.title,
            description: this.state.description,
            image: ReactDOM.findDOMNode(this.refs.thumbnail).src,
            path: this.props.imageBuilder.queryDataModel.basepath
        });
    },

    render() {
        return (
            <div>
                <canvas
                    className='CanvasImageRenderer'
                    ref='canvasRenderer'
                    width={ this.state.width }
                    height={ this.state.height }>
                </canvas>
                <div className={ this.state.dialog ? 'UpdateDialog is-visible' : 'UpdateDialog'}>
                    <div className='UpdateDialog__inside'>
                        <img ref='thumbnail' className='UpdateDialog__thumbnail' height={ Math.floor(this.state.height / 2) }/>
                        <div className='UpdateDialog__metadata' style={{ height: Math.floor(this.state.height / 2) + 'px'}}>
                            <strong className='UpdateDialog__metadata_title'>
                                <ContentEditable html={ this.state.title } onChange={ this.updateTitle }/>
                            </strong>
                            <div className='UpdateDialog__metadata_description'>
                                <ContentEditable html={ this.state.description } onChange={ this.updateDescription }/>
                            </div>
                        </div>
                        <div className='UpdateDialog__buttons'>
                            <button onClick={ this.toggleDialog }>Cancel</button>
                            <button onClick={ this.updateMetadata }>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
