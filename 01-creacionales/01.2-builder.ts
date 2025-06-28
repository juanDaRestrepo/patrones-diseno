/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

import { COLORS } from '../helpers/colors.ts';

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class Query {
  constructor(
    public table: string,
    public fields: string[],
    public conditions: string[],
    public orderFields: string[],
    public limitCount?: number,
  ) {}

  displayQuery() {
    let where = '';
    if(!(this.conditions.length === 0)) {
      where = ` where ${this.conditions.join(' and ')}`;
    }

    return `Select ${this.fields?.join(', ') ?? '*'} from ${this.table} ${where} order by ${this.orderFields.join(', ')} limit ${this.limitCount}`;
  }
}

class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    if (fields.length === 0) {
      this.fields = ['*'];
    } else {
      this.fields = fields;
    }
    return this;
  }

  where(condition: string): QueryBuilder {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    this.orderFields.push(`${field} ${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.limitCount = count;
    return this;
  }

  build(): Query {
    const query = new Query(
      this.table,
      this.fields,
      this.conditions,
      this.orderFields,
      this.limitCount,
    );
    return query;
  }
}

function main() {
  const usersQuery = new QueryBuilder('users')
    .select()
    .orderBy('name', 'ASC')
    .limit(10)
    .build();

  console.log('%cConsulta:\n', COLORS.red);
  console.log(usersQuery.displayQuery());
}

main();
