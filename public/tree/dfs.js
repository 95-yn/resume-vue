function dfs(tree) {
    console.log(tree.value);
    tree.children.forEach(dfs);
}

function bfs(tree) {
    let queue = [tree];
    while(queue.length) {
        const c = queue.shift();
        console.log(C);
        c.children.forEach((q) => {
            queue.push(q);
        });
    }
}