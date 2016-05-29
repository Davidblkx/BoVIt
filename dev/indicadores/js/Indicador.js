function BuildObjDay(user) {
    return {
        user: user,
        date: moment().format('DD-MM-YYYY'),
        meo: [],
        sft: [],
        adsl: [],
        carga: 0
    };
}

function BuildObj(user) {
    return {
        user: user,
        date: moment().format('MM-YYYY'),
        meo: 50,
        sft: 50,
        adsl: 50,
        total: 50,
        ff: 50,
        carga: 3
    };
}