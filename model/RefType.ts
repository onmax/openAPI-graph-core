// Type of a reference: https://swagger.io/docs/specification/using-ref/
export enum RefType {
    Local = 'local',
    Remote = 'remote',
    URL = 'url'
}
export type RefTo = 'schema'