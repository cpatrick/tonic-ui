import ColorPicker  from '../ColorPicker';
import NumberInput  from '../NumberInput';
import React        from 'react';
import ReactDOM     from 'react-dom';

// Load the associated style
require('./style.css')

/**
 * This React component expect the following input properties:
 *   - lut:
 *       Expect a LokkupTable instance that you want to render and edit.
 *
 *   - originalRange:
 *       Expect the data range to use for the lookup table in case of reset.
 *
 *   - inverse:
 *       Expect a boolean. If true the control point will be display using the
 *       inverse of the actual color. Otherwise a white or black line will be used
 *       depending on which one provide the best contrast for that scalar value.
 *
 *   - lutManager:
 *       Expect a reference to the lookup table manager to use.
 *
 */
export default React.createClass({

  displayName: 'LookupTableWidget',

  propTypes: {
    inverse: React.PropTypes.bool,
    lut: React.PropTypes.object.isRequired,
    lutManager: React.PropTypes.object,
    originalRange: React.PropTypes.array,
  },

  getInitialState() {
    return {
      mode: 'none',
      activePreset: this.props.lut.getPresets()[0],
      currentControlPointIndex: 0,
      internal_lut: false,
    };
  },

  componentDidMount() {
    var canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.props.lut.drawToCanvas(canvas);
  },

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.internal_lut) {
      const canvas = ReactDOM.findDOMNode(this.refs.canvas);
      this.props.lut.drawToCanvas(canvas);

      if(this.state.mode === 'edit') {
        // Draw control point
        const ctx = canvas.getContext('2d'),
          x = Math.floor(this.props.lut.getControlPoint(this.state.currentControlPointIndex).x * this.props.lut.colorTableSize),
          imageData = ctx.getImageData(0, 0, this.props.lut.colorTableSize, 1);

        const color = (imageData.data[x*4] + imageData.data[x*4+1] + imageData.data[x*4+2] > 3*255/2) ? 0 : 255;
        imageData.data[x*4+0] = this.props.inverse ? (imageData.data[x*4+0] + 128) % 256 : color;
        imageData.data[x*4+1] = this.props.inverse ? (imageData.data[x*4+1] + 128) % 256 : color;
        imageData.data[x*4+2] = this.props.inverse ? (imageData.data[x*4+2] + 128) % 256 : color;

        ctx.putImageData(imageData, 0, 0);
      }
    }
  },

  toggleEditMode() {
    if(this.state.mode === 'none' || this.state.mode !== 'edit') {
      this.setState({mode: 'edit', internal_lut: false});
    } else {
      this.setState({mode: 'none', internal_lut: false});
    }
  },

  togglePresetMode() {
    if(this.state.mode === 'none' || this.state.mode !== 'preset') {
      this.deltaPreset(0); // Render preset
      this.setState({mode: 'preset', internal_lut: true});
    } else {
      this.setState({mode: 'none', internal_lut: false});
    }
  },

  updateScalarRange() {
    var minValue = ReactDOM.findDOMNode(this.refs.min).value,
      maxValue = ReactDOM.findDOMNode(this.refs.max).value;
    this.props.lut.setScalarRange(minValue, (minValue === maxValue) ? maxValue + 1 : maxValue);
    this.forceUpdate();
  },

  addControlPoint() {
    var newIdx = this.props.lut.addControlPoint({
        x: 0.5,
        r: 0,
        g: 0,
        b: 0,
    });
    this.setState({currentControlPointIndex: newIdx});
  },

  deleteControlPoint() {
    if(this.props.lut.removeControlPoint(this.state.currentControlPointIndex)) {
        this.forceUpdate();
    }
  },

  nextControlPoint() {
    var newIdx = this.state.currentControlPointIndex + 1;

    if(newIdx < this.props.lut.getNumberOfControlPoints()) {
        this.setState({currentControlPointIndex: newIdx});
    }
  },

  previousControlPoint() {
    var newIdx = this.state.currentControlPointIndex - 1;

    if(newIdx > -1) {
        this.setState({currentControlPointIndex: newIdx});
    }
  },

  updateScalar(newVal) {
    var scalarRange = this.props.lut.getScalarRange(),
        xValue = (newVal - scalarRange[0]) /
          (scalarRange[1] - scalarRange[0]),
        controlPoint = this.props.lut.getControlPoint(this.state.currentControlPointIndex);

    var newIdx = this.props.lut.updateControlPoint( this.state.currentControlPointIndex, {
        x: xValue,
        r: controlPoint.r,
        g: controlPoint.g,
        b: controlPoint.b,
    });
    this.setState({ currentControlPointIndex: newIdx });
    this.forceUpdate();
  },

  updateRGB(rgb) {
    var controlPoint = this.props.lut.getControlPoint(this.state.currentControlPointIndex);

    var newIdx = this.props.lut.updateControlPoint( this.state.currentControlPointIndex, {
        x: controlPoint.x,
        r: rgb[0] / 255,
        g: rgb[1] / 255,
        b: rgb[2] / 255,
    });
    this.setState({ currentControlPointIndex: newIdx });
  },

  setPreset(event) {
    this.props.lut.setPreset(event.target.dataset.name);
    this.togglePresetMode();
  },

  resetRange() {
    var range = this.props.originalRange;
    this.props.lut.setScalarRange(range[0], range[1]);
  },

  changePreset(event) {
    var delta = event.detail || event.deltaY || event.deltaX;
    event.preventDefault();
    this.deltaPreset(delta);
  },

  nextPreset() {
    this.deltaPreset(1);
  },

  previousPreset() {
    this.deltaPreset(-1);
  },

  deltaPreset(delta) {
    var presets = this.props.lut.getPresets(),
        currentIdx = presets.indexOf(this.state.activePreset),
        newPreset = null;


    currentIdx += (delta === 0) ? 0 : (delta < 0) ? -1 : 1;
    if(currentIdx < 0 || currentIdx === presets.length) {
        return;
    }

    newPreset = presets[currentIdx];
    if(this.props.lutManager) {
        let lut = this.props.lutManager.getLookupTable('__internal');
        if(!lut) {
            lut = this.props.lutManager.addLookupTable('__internal', [0,1], newPreset)
        } else {
            lut.setPreset(newPreset);
        }
        lut.drawToCanvas(ReactDOM.findDOMNode(this.refs.canvas));
    }
    this.setState({activePreset: newPreset});
  },

  render() {
    var scalarRange = this.props.lut.getScalarRange(),
        controlPoint = this.props.lut.getControlPoint(this.state.currentControlPointIndex),
        controlPointValue = ((controlPoint.x * (scalarRange[1] - scalarRange[0])) + scalarRange[0]),
        color = [ Math.floor(255*controlPoint.r), Math.floor(255*controlPoint.g), Math.floor(255*controlPoint.b) ];

    return (
        <div className={ 'LookupTableWidget is-mode-' + this.state.mode}>
            <div className='LookupTableWidget__line'>
                <i className='fa fa-fw fa-pencil LookupTableWidget__button' onClick={ this.toggleEditMode }></i>
                <canvas ref='canvas' className='LookupTableWidget__canvas' width={ this.props.lut.colorTableSize * this.props.lut.scale } height='1'></canvas>
                <i className='fa fa-fw fa-tint LookupTableWidget__button' onClick={ this.togglePresetMode }></i>
            </div>
            <div className='LookupTableWidget__range'>
                <NumberInput ref='min' classes={['LookupTableWidget__input']}
                  value={this.props.lut.getScalarRange()[0]} onChange={this.updateScalarRange} />
                <i onClick={ this.resetRange } className='fa fa-fw fa-arrows-h LookupTableWidget__button'></i>
                <NumberInput ref='max' classes={['LookupTableWidget__input', 'right']}
                  value={this.props.lut.getScalarRange()[1]} onChange={this.updateScalarRange} />
            </div>
            <div className='LookupTableWidget__editContent'>
                <div className='LookupTableWidget__line'>
                    <i onClick={ this.previousControlPoint } className='fa fa-fw fa-chevron-left LookupTableWidget__button right'></i>
                    <div className='LookupTableWidget__label'>{ this.state.currentControlPointIndex + 1 } / { this.props.lut.getNumberOfControlPoints() }</div>
                    <i onClick={ this.nextControlPoint } className='fa fa-fw fa-chevron-right LookupTableWidget__button right'></i>
                    <i onClick={ this.addControlPoint } className='fa fa-fw fa-plus LookupTableWidget__button right'></i>
                    <NumberInput ref='x' classes={['LookupTableWidget__input', 'right']}
                      value={controlPointValue} onChange={this.updateScalar } />
                    <i onClick={ this.deleteControlPoint } className='fa fa-fw fa-trash-o LookupTableWidget__button'></i>
                </div>
                <ColorPicker color={ color } onChange={ this.updateRGB }/>
            </div>
            <div className='LookupTableWidget__presets'>
                <i onClick={ this.previousPreset } className={ (this.state.activePreset === this.props.lut.getPresets()[0] ? 'is-disabled ' : '') +
                  'fa fa-fw fa-chevron-left LookupTableWidget__button right'}></i>
                { this.props.lut.getPresets().map( (preset) => {
                    return (<div onClick={ this.setPreset }
                      onScroll={ this.changePreset }
                      onWheel={ this.changePreset }
                      className={ (this.state.activePreset === preset ? '' : 'is-hidden ') + 'LookupTableWidget__preset'}
                      data-name={preset}
                      key={preset}>{preset}</div>);
                })}
                <i onClick={ this.nextPreset }
                  className={ (this.state.activePreset === this.props.lut.getPresets()[this.props.lut.getPresets().length - 1] ?
                    'is-disabled ' :
                    '') + 'fa fa-fw fa-chevron-right LookupTableWidget__button right'}></i>
            </div>
        </div>
    );
  },
});
