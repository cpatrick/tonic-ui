import BinaryImageStream    from 'tonic-io/lib/BinaryImageStream';
import NativeImageRenderer  from '../../../native/renderer/Image';
import React                from 'react';
import ReactDOM             from 'react-dom';
import * as sizeHelper           from '../../../util/SizeHelper';
import VtkWebMouseListener  from '../../../interaction/VtkWebMouseListener';

console.log(sizeHelper);

export default React.createClass({

    displayName: 'VtkRenderer',

    componentDidMount() {
        var container = ReactDOM.findDOMNode(this),
            { clientWidth, clientHeight } = sizeHelper.getSize(container);

        this.binaryImageStream = new BinaryImageStream(this.props.connection.urls + 'b', clientWidth, clientHeight);
        this.mouseListener = new VtkWebMouseListener(this.props.client);

        // Attach interaction listener for image quality
        this.mouseListener.onInteraction( (interact) => {
            if(interact) {
                this.binaryImageStream.startInteractiveQuality();
            } else {
                this.binaryImageStream.stopInteractiveQuality();
            }
        });

        // Attach size listener
        this.subscription = sizeHelper.onSizeChange( () => {
            var { clientWidth, clientHeight } = sizeHelper.getSize(container);
            this.mouseListener.updateSize(clientWidth, clientHeight);
            this.props.client.session.call('viewport.size.update', [-1, clientWidth, clientHeight]);
        });

        // Create render
        this.imageRenderer = new NativeImageRenderer(container, this.binaryImageStream, this.mouseListener.getListeners());

        // Establish image stream connection
        this.binaryImageStream.connect({view_id: -1});

        // Update size
        sizeHelper.triggerChange();
    },

    componentWillMount() {
        // Make sure we monitor window size if it is not already the case
        sizeHelper.startListening();
    },

    componentWillUnmount() {
        if(this.binaryImageStream) {
            this.binaryImageStream.destroy();
            this.binaryImageStream = null;
        }

        if(this.mouseListener) {
            this.mouseListener.destroy();
            this.mouseListener = null;
        }

        if(this.imageRenderer) {
            this.imageRenderer.destroy();
            this.imageRenderer = null;
        }

        if(this.subscription){
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    },

    render() {
        return <div className='VtkRenderer'></div>;
    }
});

