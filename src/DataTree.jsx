{/* Создание "дерева" с данными, добавляем новое свойство, в котором будут храниться дочерние элементы в массиве */}

export const buildTree = (data) => {
    const map = new Map();

    data.forEach(item => map.set(item.id, { ...item, children: [] }));

    data.forEach(item => {
        if (item.parentId !== 0) {
            map.get(item.parentId).children.push(map.get(item.id));
        }
    });

    {/* Тут я возвращаю только элементы, у которых нет родительского элемента, чтобы элементы не повторялись и не путались */}
    return [...map.values()].filter(item => item.parentId === 0);
};