const storage = {
    getItem(name: string): any {
        let item: any = typeof localStorage.getItem(name) == 'string' ? localStorage.getItem(name) : '{}';
        return JSON.parse(item)
    },
    setItem(name:string,item:any):void{
        localStorage.setItem(name,JSON.stringify(item));
    },
    removeItem(name:string):void{
        localStorage.removeItem(name);
    }
}
export default storage;