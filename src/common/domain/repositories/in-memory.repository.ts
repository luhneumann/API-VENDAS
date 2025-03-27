import { RepositoryInterface, SearchInput, SearchOutput } from "./repository.interface";
import { NotFoundError } from "../errors/not-found-error";
import { randomUUID } from "node:crypto";

export type ModelProps = {
  id?: string
  [key:string]: any //é uma forma de dizer que esse modelo de dados pode conter um ou mais campos desde que seu nome seja uma string e seu valor seja qualquer um. Isso é uma forma de definir o modelo genérico para implementar a RepositoryInterface.
}

export type CreateProps ={
  [key: string]: any
}

export abstract class InMemoryRepository<Model extends ModelProps> implements RepositoryInterface <Model, CreateProps>{
  items: Model[] = []
  sortableFields: string[] = [] // aqui será possível definir quais campos poderão ser utilizados no método search


  create(props: CreateProps): Model {
    //Cria um objeto em memória
    const model = {
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      ...props
    }
    return model as unknown as Model
  }

  async insert(model: Model): Promise<Model> {
    //persiste os dados criados com o create
    this.items.push(model)
    return model
  }
  async findById(id: string): Promise<Model> {
    return this._get(id)
    //quando a gente utiliza um método assincrono diretamente com o "return", não é necessário adicionar o AWAIT. Isso ocorre pq o return sempre espera o resultado para trazer o dado.
  }

   async update(model: Model): Promise<Model> {
    await this._get(model.id)
    const index = this.items.findIndex(item => item.id === model.id)
    this.items[index] = model
    return model
   }

   async delete(id: string): Promise<void> {
    await this._get(id)
    const index = this.items.findIndex(item => item.id === id)
    this.items.splice(index, 1)

   }
   async search(props: SearchInput): Promise<SearchOutput<Model>> {
    const page = props.page ?? 1
    const per_page = props.per_page?? 15
    const sort = props.sort ?? null
    const sort_dir = props.sort_dir ?? null
    const filter = props.filter ?? null

    const filteredItens = await this.applyFilter(this.items, filter)
    const orderedItems = await this.applySort(filteredItens, sort, sort_dir)
    const paginatedItems = await this.applyPaginate(
      orderedItems,
      page,
      per_page
    )
    return {
      items: paginatedItems,
      total: filteredItens.length,
      current_page: page,
      per_page,
      sort,
      sort_dir,
      filter
    }
   }

   protected abstract applyFilter(
    items: Model[],
    filter: string | null,

   ): Promise<Model[]>

   protected async applySort(
    items: Model[],
    sort: string | null,
    sort_dir: string | null,
    ): Promise<Model[]> {
      if(!sort || !this.sortableFields.includes(sort)){
        return items
      }

      return [...items].sort((a,b) => {
        //usa-se o spread [...items] para criar um novo array para fazer a verificação e evita que os dados originais sejam alterados
        if(a[sort] < b[sort]) {
          return sort_dir === 'asc' ? -1 : 1
        }
        if(a[sort] > b[sort]) {
          return sort_dir === 'asc' ? 1: -1
        }
        return 0
      })
    }

    protected async applyPaginate(
      items: Model[],
      page: number,
      per_page: number,
    ): Promise<Model[]> {
      const start = (page - 1) * per_page
      const limit = start + per_page
      return items.slice(start, limit)
    }

   protected async _get(id: string): Promise<Model>{
    const model = this.items.find((item) => item.id === id)
    if(!model) {
      throw new NotFoundError(`Model not found using ID ${id}`)
    }
    return model
   }

}
