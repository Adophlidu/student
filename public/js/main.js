var tBody = tab.tBodies[0],
    count = document.getElementById('count'),
    oTrs = tBody.getElementsByTagName('tr'),
    gender = tBody.getElementsByClassName('gender')

Array.prototype.slice.call(gender).forEach(function (item, index) {
    var val = item.innerHTML
    val = val === '0' ? '男' : '女'
    item.innerHTML = val
})
count.innerHTML = oTrs.length