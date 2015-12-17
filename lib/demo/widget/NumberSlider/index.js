import NumberSliderControl  from '../../../react/widget/NumberSliderControl';
import React                from 'react';
import ReactDOM             from 'react-dom';

const ColorField = React.createClass({
  getInitialState(){
    return {r:30, g:60, b:90};
  },

  componentDidMount() {
    this.drawColor();
  },

  componentDidUpdate() {
    this.drawColor();
  },

  updateVal(e) {
    var which = e.target.name,
        newVal = e.target.value,
        toUpdate = {};
    toUpdate[which] = newVal;
    this.setState(toUpdate);
  },

  drawColor() {
    var ctx = ReactDOM.findDOMNode(this.refs.canvas).getContext('2d'),
        width = ctx.canvas.width,
        height = ctx.canvas.height;
    ctx.fillStyle = `rgb(${this.state.r}, ${this.state.g}, ${this.state.b})`;
    ctx.rect(0,0,width,height);
    ctx.fill();
  },

  render() {
    var [r,g,b] = [this.state.r, this.state.g, this.state.b];
    return (
      <section>
        <NumberSliderControl value={r} max="255" min="0" onChange={this.updateVal} name="r" />
        <NumberSliderControl value={g} max="255" min="0" onChange={this.updateVal} name="g" />
        <NumberSliderControl value={b} max="255" min="0" onChange={this.updateVal} name="b" />
        <canvas ref="canvas" width="50" height="50"></canvas>
      </section>
    );
  }
});

ReactDOM.render(<ColorField/>, document.querySelector('.content'));
