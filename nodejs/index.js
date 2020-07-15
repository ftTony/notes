let _ = require('lodash');

let list = [{
        id: 1,
        name: "部门A",
        company_id: 1,
        company_name: "公司A",
    },
    {
        id: 1,
        name: "部门A",
        company_id: 1,
        company_name: "公司A",
    },
    {
        id: 2,
        name: "部门B",
        company_id: 1,
        company_name: "公司A",
    },
    {
        id: 3,
        name: "部门C",
        company_id: 2,
        company_name: "公司B",
    },
    {
        id: 4,
        name: "部门D",
        company_id: 2,
        company_name: "公司B",
    },
    {
        id: 5,
        name: "部门E",
        company_id: 2,
        company_name: "公司B",
    },
    {
        id: 6,
        name: "部门F",
        company_id: 3,
        company_name: "公司C",
    },
    {
        id: 7,
        name: "部门G",
        company_id: 3,
        company_name: "公司C",
    },
    {
        id: 8,
        name: "部门H",
        company_id: 3,
        company_name: "公司C",
    }
];

let arr = [];
list = _.uniqBy(list, 'id')
let map = list.reduce((res, item) => {
    res[item.company_id] ?
        res[item.company_id].children.push(item) :
        (res[item.company_id] = {
            id: item.company_id,
            name: item.company_name,
            children: [item],
        });

    return res;
}, {});

for (const key in map) {
    arr.push(map[key]);
}
console.log(arr);