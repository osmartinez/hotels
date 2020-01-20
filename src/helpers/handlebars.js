const hbsHelpers = {}
hbsHelpers.gt = (a, b) => {
    return a > b
}

hbsHelpers.and = (a, b) => {
    return a && b
}

hbsHelpers.length= (a)=>{
    if(typeof a ==='undefined'){
        return 0
    }
    return a.length
}


hbsHelpers.eq = (a, b) => {
    return a == b
}

hbsHelpers.times = (n, block) => {
    var accum = '';
    for (var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
}

hbsHelpers.json = (content) => {
    return JSON.stringify(content)
}


hbsHelpers.checked = (value) => {
    return value == true ? " checked" : ''
}
module.exports = hbsHelpers;
