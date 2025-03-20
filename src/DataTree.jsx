export const buildTree = (data) => {
    const map = new Map();

    data.forEach(item => map.set(item.id, { ...item, children: [] }));

    data.forEach(item => {
        if (item.parentId !== 0) {
            map.get(item.parentId).children.push(map.get(item.id));
        }
    });

    return [...map.values()].filter(item => item.parentId === 0);
};