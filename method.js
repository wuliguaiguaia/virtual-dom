function patchElement(parent, newVNode, oldVNode, index = 0) {
    if (!oldVNode) { // 新增
        parent.appendChild(newVNode.render())
    } else if (!newVNode) { //  删除
        parent.removeChild(parent.childNodes[index])
    } else if (newVNode.tag !== oldVNode.tag || typeof newVNode.children[0] !== "object") { // 替换
        parent.replaceChild(newVNode.render(), parent.childNodes[index])
    } else { 
        for (let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
            patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i)
        }
    }
}

function Compare(obj, key) {
    let arr = [];
    arr[0] = obj[0];
    arr[1] =obj[1].sort((x, y) => {
        if (typeof x[key] === "string") {
            return x[key].localeCompare(y[key])
        } else {
            return x[key] - y[key]
        }
    })
    return arr;
}

// VNode 构造函数
function VNode(opt) {
    this.tag = opt.tag;
    this.props = opt.props;
    this.children = opt.children;
}
VNode.prototype.render = function () {
    let el = document.createElement(this.tag);
    if (this.props) {
        for (let key in this.props) {
            el[key] = this.props[key]
        }
    }
    let children = this.children || [];
    children.forEach((child) => {
        let childEl = (child instanceof VNode) ?
            child.render() : document.createTextNode(child);
        el.appendChild(childEl);
    })
    return el;
}

//  返回一个VNode实例
function el(tag, props, children) {
    return new VNode({ tag, props, children })
}

//  根据 data 构造 table DOM
function createTableVDOM(data,key) {
    let children = [];
    // 0
    let keywords = [];
    data[0].forEach((item,index)=>{
        let className = index === key ? "active" : "";
        console.log(index,key);
        
        keywords.push(el('th', { id: item, className: className }, [item]))
    });
    children.push(el('tr', { id: 'head' },keywords));

    // 1
    data[1].forEach((item)=>{
        let arr = [];
        item.forEach((val)=>{
            arr.push(el('td', null, [val]))
        })
        children.push(el('tr', null,arr));
    })
    return el('table', null, children)
}
