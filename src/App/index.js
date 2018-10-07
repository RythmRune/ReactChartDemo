"use strict"

import React from 'react'
import PropTypes from 'prop-types'
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import loggerMiddleware from 'redux-logger'
// import reducers from './reducers'


import chart from 'chart.js';
import style from './data/style.json'
import { genData, getProductRealizedSum, getPortfolioSum } from './utils/database'

class App extends React.Component {

    constructor(props) {
        super(props);
        // this.store = createStore(
        //     reducers,
        //     applyMiddleware(thunkMiddleware, loggerMiddleware)
        // );
        this.state = {
            data: genData(500),
            // step: 0,
            show: {
                step: 0,
                data: getProductRealizedSum(this.state.data),
            }
        }
        // state 0: init
        // state 1: portfolio
        // state 2: table
        this.drawTotalAbstract = this.drawTotalAbstract.bind(this);
        // this.drawProductAbstract = this.drawProductAbstract.bind(this);
        // this.drawDetail = this.drawDetail.bind(this);
    }

    drawTotalAbstract = () => {

        const node = this.node1;
        new Chart(node, {
            type: 'horizontalBar',
            data: {
                labels: Object.keys(this.state.show.data),
                datasets: [{
                    label: "Realize",
                    data: Object.keys(this.state.show.data).map(d => this.state.show.data[d]),
                    backgroundColor: style.background_color,
                    borderColor: style.border_color,
                    borderWidth: 1
                }]
            },
            options: {
                onClick: (event, item) => {
                    let portfolio = item[0]._view.label;
                    this.setState({ show: { step: 1, data: getPortfolioSum(this.state.data, portfolio) } });
                }
            }
        });
    }

    drawProductAbstract = () => {

    }

    componentDidMount() {
        if (this.state.show.step === 0)
            this.drawTotalAbstract();

        // if (this.state.step === 1)
        //     this.drawTotalAbstract()

        // if (this.state.step === 2)
        //     this.drawTotalAbstract()
    }

    componentDidUpdate() {
        if (this.state.step === 0)
            this.drawTotalAbstract();

        // if (this.state.step === 1)
        //     this.drawTotalAbstract()

        // if (this.state.step === 2)
        //     this.drawTotalAbstract()
    }

    render() {
        return (
            // <Provider store={this.store}>
            <div>
                {(this.state.step === 0) ? < canvas ref={node1 => (this.node1 = node1)} ></canvas > : ""}
                < canvas ref={node2 => (this.node2 = node2)} ></canvas >
                < canvas ref={node3 => (this.node3 = node3)} ></canvas >
            </div>
            // </Provider >
        )
    }

}

App.propTypes = {
}

App.defaultProps = {
}

export default App;