export class List<T> {
    private m_items: Array<T>;

    constructor(){
        this.m_items = [];
    }

    Add(_item:T)
    {
        this.m_items.push(_item);
    }
    AddRange(_items:T[])
    {
        for(var i=0;i<_items.length;i++)
        {
            this.m_items.push(_items[0]);
        }
    }

  

    Get(_index:number) : T
    {
        return this.m_items[_index];
    }

    Insert(_item:T)
    {
        this.m_items.splice(0,0, _item);
    }
    Remove(_index: number)
    {
        this.m_items.splice(_index,1);
    }

    public GetRaw():Array<T>{return this.m_items;}
}