let data = [
    ["Name", "Chinese", "Math", "English"],
    [
        ["Jack", 75, 95, 87], 
        ["Frank", 86, 92, 90], 
        ["Alias", 80, 90, 85]]    
]

let tableVTree = createTableVDOM(data, 0)
let tableNodes = tableVTree.render();

APP.prepend(tableNodes)

head.onclick = (e) => {
    let key = e.target;
    let index = [...e.currentTarget.children].indexOf(key)

    let newData = Compare(data,index);
    console.log(newData);
    
    let newTableVTree = createTableVDOM(newData,index);
    console.log(newTableVTree);

    patchElement(APP, newTableVTree, tableVTree)
}









