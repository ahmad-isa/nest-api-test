export interface Paginated<T>{
    items: T[];
    status: number;
    total: number;
    perpage: number;
    page: number;
}