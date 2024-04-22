export function range(start, end, step=1){
    if(typeof end === 'undefined'){
        end = start
        start = 0
    }

    let val = []
    for(let i=start; i<end; i += step){
        val.push(i)
    }

    return val
}