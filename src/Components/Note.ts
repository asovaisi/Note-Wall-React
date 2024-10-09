export class Note {

    constructor(id:string, title: string, note: string, deadLine: string, createTime: Date) {
        this.id = id
        this.title = title
        this.note = note
        this.deadLine = deadLine
        this.createTime = createTime
    }

    id: string;
    title: string;
    note: string;
    deadLine: string;
    createTime: Date;
}