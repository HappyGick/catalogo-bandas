export function sqlStringListToArray(list: string): string[] {
    return list.split(';');
}

export function sqlNumberListToArray(list: string): number[] {
    let numberArray: number[] = [];
    let splitList: string[] = list.split(';');

    for (let i = 0; i < splitList.length; ++i) {
        numberArray.push(parseInt(splitList[i]));
    }

    return numberArray;
}

export function arrayToSqlStringList(array: string[]): string {
    return array.join(';');
}