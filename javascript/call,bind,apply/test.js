var foo = {
    value: 2
}
function test(arg1, arg2) {
    console.log('this.value:', this.value)
    console.log('arg1:', arg1)
    console.log('arg2:', arg2)
}

module.exports = {
    foo,
    test
}

