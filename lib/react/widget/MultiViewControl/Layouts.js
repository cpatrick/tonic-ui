import React from 'react';

export default React.createClass({

    displayName: 'Layouts',

    propTypes: {
        onChange: React.PropTypes.func,
    },

    onLayoutChange(event) {
        var layout = event.currentTarget.getAttribute('name');
        if(this.props.onChange) {
            this.props.onChange(layout);
        }
    },

    render() {
        return (<section>
                    <table name="2x2" onClick={this.onLayoutChange}>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                    <table name="1x2" onClick={this.onLayoutChange}>
                      <tbody>
                        <tr>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                    <table name="2x1" onClick={this.onLayoutChange}>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                    <table name="1x1" onClick={this.onLayoutChange}>
                      <tbody>
                        <tr>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                    <table name="3xL" onClick={this.onLayoutChange}>
                      <tbody>
                        <tr>
                          <td rowSpan="2"></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                    <table name="3xT" onClick={this.onLayoutChange}>
                      <tbody>
                        <tr>
                          <td colSpan="2"></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                    <table name="3xR" onClick={this.onLayoutChange}>
                      <tbody>
                        <tr>
                          <td></td>
                          <td rowSpan="2"></td>
                        </tr>
                        <tr>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                    <table name="3xB" onClick={this.onLayoutChange}>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                        </tr>
                      </tbody>
                    </table>
                </section>);
    },
});
