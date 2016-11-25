export function moveNext() {
    return {
        type: "move-next"
    }
}

export function movePrev() {
    return {
        type: "move-prev"
    }
}

export function reducer(state: number, action: any) {
    switch (action.type) {
        case "move-next": return state + 1;
        case "move-prev": return state - 1;
        default: return state;
    }
}