import faker from 'faker'
import mathjs from 'mathjs'
import data from '../data/data.json'

export const genData = (length) => {
    let exp_data = [];
    for (let i = 0; i < length; i++) {
        exp_data.push({
            portfolio: data.portfolio[(Math.floor(Math.random() * 10)) % data.portfolio.length],
            type: data.type[(Math.floor(Math.random() * 10)) % data.type.length],
            realized: Number(faker.finance.amount()) * ((((Math.floor(Math.random() * 10)) % 3) === 0) ? -1 : 1),
            unrealized: 0,
        })
    }
    return exp_data;
}

export const getProductRealizedSum = (data) => {
    let product = {}
    data.map((p) => {
        if (!product.hasOwnProperty(p.type)) {
            product[p.type] = 0;
        }
        product[p.type] = mathjs.add(product[p.type], Number(p.realized));
    })
    return product;
}

// export const getPortfolioSum = (data, type, portfolio)=>{
//     let portfolioSum = {}
//     data.filter((d)=>{
//         return (d.type === type)
//     }).map((p)=>{
//         if (!portfolioSum.hasOwnProperty(p.type)) {
//             product[p.type] = 0;
//         }
//         product[p.type] = mathjs.add(product[p.type], Number(p.realized));
//     })
// }