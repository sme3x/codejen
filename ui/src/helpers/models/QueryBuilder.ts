import type { Filter } from '@/interfaces/models/Filter'
import type {
	QueryBuilder as QueryBuilderInterface,
	ID,
	Closure,
	Operator,
	JoinType,
	Column,
	Relation,
	Table,
} from '@/interfaces/models/QueryBuilder'

export default class QueryBuilder implements QueryBuilderInterface {
	#query: Filter = []

	#addMethodToQuery(method: string, params: any[]): void {
		this.#query.push({
			type: 'method',
			method,
			params: params.map((param) => {
				if (typeof param === 'function') {
					const closureQueryBuilder = new QueryBuilder()
					param(new QueryBuilder())
					return {
						type: 'closure',
						params: closureQueryBuilder.getFilter(),
					}
				} else {
					return {
						type: 'value',
						value: param,
					}
				}
			}),
		})
	}

	getFilter(): Filter {
		return this.#query
	}

	/** Add a where clause on the primary key to the query. */
	whereKey(id: ID): QueryBuilder {
		this.#addMethodToQuery('whereKey', [id])
		return this
	}

	/** Add a where clause on the primary key to the query. */
	whereKeyNot(id: ID): QueryBuilder {
		this.#addMethodToQuery('whereKeyNot', [id])
		return this
	}

	/** Add a basic where clause to the query. */
	where(
		column: Closure | string | string[],
		operator: Operator | null = null,
		value: string | number | null = null,
		boolean: 'and' | 'or' = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('where', [column, operator, value, boolean])
		return this
	}

	/** Add an "or where" clause to the query. */
	orWhere(
		column: Closure | string | string[],
		operator: Operator | null = null,
		value: string | number | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhere', [column, operator, value])
		return this
	}

	/** Add a basic "where not" clause to the query. */
	whereNot(
		column: Closure | string | string[],
		operator: Operator | null = null,
		value: string | number | null = null,
		boolean: 'and' | 'or' = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereNot', [column, operator, value, boolean])
		return this
	}

	/** Add an "or where not" clause to the query. */
	orWhereNot(
		column: Closure | string | string[],
		operator: Operator | null = null,
		value: string | number | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereNot', [column, operator, value])
		return this
	}

	/** Add an "order by" clause for a timestamp to the query. */
	latest(column: Column | null = null): QueryBuilder {
		this.#addMethodToQuery('latest', [column])
		return this
	}

	/** Add an "order by" clause for a timestamp to the query. */
	oldest(column: Column | null = null): QueryBuilder {
		this.#addMethodToQuery('oldest', [column])
		return this
	}

	/** Set the columns to be selected. */
	select(columns: Column[] = ['*']): QueryBuilder {
		this.#addMethodToQuery('select', [columns])
		return this
	}

	/** Add a new select column to the query. */
	addSelect(column: Column[]): QueryBuilder {
		this.#addMethodToQuery('addSelect', [column])
		return this
	}

	/** Force the query to only return distinct results. */
	distinct(): QueryBuilder {
		this.#addMethodToQuery('distinct', [])
		return this
	}

	/** Add a join clause to the query. */
	join(
		table: Table,
		first: Closure | string,
		operator: Operator | null = null,
		second: string | null = null,
		type: JoinType = 'inner',
		where: boolean = false,
	): QueryBuilder {
		this.#addMethodToQuery('join', [table, first, operator, second, type, where])
		return this
	}

	/** Add a "join where" clause to the query. */
	joinWhere(
		table: Table,
		first: Closure | string,
		operator: Operator,
		second: string,
		type: JoinType,
	): QueryBuilder {
		this.#addMethodToQuery('joinWhere', [table, first, operator, second, type])
		return this
	}

	/** Add a lateral join clause to the query. */
	joinLateral(query: Closure | string, as: string, type: JoinType = 'inner'): QueryBuilder {
		this.#addMethodToQuery('joinLateral', [query, as, type])
		return this
	}

	/** Add a lateral left join to the query. */
	leftJoinLateral(query: Closure | string, as: string): QueryBuilder {
		this.#addMethodToQuery('leftJoinLateral', [query, as])
		return this
	}

	/** Add a left join to the query. */
	leftJoin(
		table: Table,
		first: Closure | string,
		operator: Operator | null = null,
		second: string | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('leftJoin', [table, first, operator, second])
		return this
	}

	/** Add a "join where" clause to the query. */
	leftJoinWhere(
		table: Table,
		first: Closure | string,
		operator: Operator,
		second: string | null,
	): QueryBuilder {
		this.#addMethodToQuery('leftJoinWhere', [table, first, operator, second])
		return this
	}

	/** Add a right join to the query. */
	rightJoin(
		table: Table,
		first: Closure | string,
		operator: Operator | null = null,
		second: string | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('rightJoin', [table, first, operator, second])
		return this
	}

	/** Add a "right join where" clause to the query. */
	rightJoinWhere(
		table: Table,
		first: Closure | string,
		operator: Operator,
		second: string,
	): QueryBuilder {
		this.#addMethodToQuery('rightJoinWhere', [table, first, operator, second])
		return this
	}

	/** Add a "cross join" clause to the query. */
	crossJoin(
		table: Table,
		first: Closure | string | null,
		operator: Operator | null = null,
		second: string | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('crossJoin', [table, first, operator, second])
		return this
	}

	/** Add a "where" clause comparing two columns to the query. */
	/** whereColumn(column: Column|Column[], operator: Operator|null = null, second: string|null = null, boolean: string|null = 'and'): QueryBuilder */
	whereColumn(
		column: Column | Column[],
		operator: Operator | null = null,
		second: string | null = null,
		boolean: string | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('whereColumn', [column, operator, second, boolean])
		return this
	}

	/** Add an "or where" clause comparing two columns to the query. */
	orWhereColumn(
		column: Column | Column[],
		operator: Operator | null = null,
		second: string | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereColumn', [column, operator, second])
		return this
	}

	/** Add a "where in" clause to the query. */
	whereIn(
		column: Column,
		values: string[] | number[],
		boolean: string = 'and',
		not: boolean = false,
	): QueryBuilder {
		this.#addMethodToQuery('whereIn', [column, values, boolean, not])
		return this
	}

	/** Add an "or where in" clause to the query. */
	orWhereIn(column: Column, values: string[] | number[]): QueryBuilder {
		this.#addMethodToQuery('orWhereIn', [column, values])
		return this
	}

	/** Add a "where not in" clause to the query. */
	whereNotIn(column: Column, values: string[] | number[], boolean: string = 'and'): QueryBuilder {
		this.#addMethodToQuery('whereNotIn', [column, values, boolean])
		return this
	}

	/** Add an "or where not in" clause to the query. */
	orWhereNotIn(column: Column, values: string[] | number[]): QueryBuilder {
		this.#addMethodToQuery('orWhereNotIn', [column, values])
		return this
	}

	/** Add a "where null" clause to the query. */
	whereNull(
		columns: Column | Column[],
		boolean: string = 'and',
		not: boolean = false,
	): QueryBuilder {
		this.#addMethodToQuery('whereNull', [columns, boolean, not])
		return this
	}

	/** Add an "or where null" clause to the query. */
	orWhereNull(column: Column): QueryBuilder {
		this.#addMethodToQuery('orWhereNull', [column])
		return this
	}

	/** Add a "where not null" clause to the query. */
	whereNotNull(columns: Column | Column[], boolean: string = 'and'): QueryBuilder {
		this.#addMethodToQuery('whereNotNull', [columns, boolean])
		return this
	}

	/** Add a where between statement to the query. */
	whereBetween(
		column: Column,
		iterable: [string | number, string | number],
		boolean: string = 'and',
		not: boolean = false,
	): QueryBuilder {
		this.#addMethodToQuery('whereBetween', [column, iterable, boolean, not])
		return this
	}

	/** Add a where between statement using columns to the query. */
	/** whereBetweenColumns(column: Column, values: [string, string], boolean: string = 'and', not: boolean = false): QueryBuilder */
	whereBetweenColumns(
		column: Column,
		values: [string, string],
		boolean: string = 'and',
		not: boolean = false,
	): QueryBuilder {
		this.#addMethodToQuery('whereBetweenColumns', [column, values, boolean, not])
		return this
	}

	/** Add an or where between statement to the query. */
	orWhereBetween(column: Column, iterable: [string | number, string | number]): QueryBuilder {
		this.#addMethodToQuery('orWhereBetween', [column, iterable])
		return this
	}

	/** Add an or where between statement using columns to the query. */
	orWhereBetweenColumns(column: Column, values: [string, string]): QueryBuilder {
		this.#addMethodToQuery('orWhereBetweenColumns', [column, values])
		return this
	}

	/** Add a where not between statement to the query. */
	whereNotBetween(
		column: Column,
		iterable: [string | number, string | number],
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereNotBetween', [column, iterable, boolean])
		return this
	}

	/** Add a where not between statement using columns to the query. */
	whereNotBetweenColumns(
		column: Column,
		values: [string, string],
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereNotBetweenColumns', [column, values, boolean])
		return this
	}

	/** Add an or where not between statement to the query. */
	orWhereNotBetween(column: Column, iterable: [string | number, string | number]): QueryBuilder {
		this.#addMethodToQuery('orWhereNotBetween', [column, iterable])
		return this
	}

	/** Add an or where not between statement using columns to the query. */
	orWhereNotBetweenColumns(column: Column, values: [string, string]): QueryBuilder {
		this.#addMethodToQuery('orWhereNotBetweenColumns', [column, values])
		return this
	}

	/** Add an "or where not null" clause to the query. */
	orWhereNotNull(column: Column): QueryBuilder {
		this.#addMethodToQuery('orWhereNotNull', [column])
		return this
	}

	/** Add a "where date" statement to the query. */
	whereDate(
		column: Column,
		operator: string | Operator,
		value: string | Operator | null = null,
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereDate', [column, operator, value, boolean])
		return this
	}

	/** Add an "or where date" statement to the query. */
	orWhereDate(
		column: Column,
		operator: string | Operator,
		value: string | Operator | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereDate', [column, operator, value])
		return this
	}

	/** Add a "where time" statement to the query. */
	whereTime(
		column: Column,
		operator: string | Operator,
		value: string | Operator | null = null,
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereTime', [column, operator, value, boolean])
		return this
	}

	/** Add an "or where time" statement to the query. */
	orWhereTime(
		column: Column,
		operator: string | Operator,
		value: string | Operator | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereTime', [column, operator, value])
		return this
	}

	/** Add a "where day" statement to the query. */
	whereDay(
		column: Column,
		operator: string | Operator | null = null,
		value: string | Operator | null = null,
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereDay', [column, operator, value, boolean])
		return this
	}

	/** Add an "or where day" statement to the query. */
	orWhereDay(
		column: Column,
		operator: string | Operator | null = null,
		value: string | Operator | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereDay', [column, operator, value])
		return this
	}

	/** Add a "where month" statement to the query. */
	whereMonth(
		column: Column,
		operator: string | Operator | null = null,
		value: string | Operator | null = null,
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereMonth', [column, operator, value, boolean])
		return this
	}

	/** Add an "or where month" statement to the query. */
	orWhereMonth(
		column: Column,
		operator: string | Operator | null = null,
		value: string | Operator | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereMonth', [column, operator, value])
		return this
	}

	/** Add a "where year" statement to the query. */
	whereYear(
		column: Column,
		operator: string | Operator | null = null,
		value: string | Operator | null = null,
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereYear', [column, operator, value, boolean])
		return this
	}

	/** Add an "or where year" statement to the query. */
	orWhereYear(
		column: Column,
		operator: string | Operator | null = null,
		value: string | Operator | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereYear', [column, operator, value])
		return this
	}

	/** Add a nested where statement to the query. */
	whereNested(callback: Closure, boolean: string = 'and'): QueryBuilder {
		this.#addMethodToQuery('whereNested', [callback, boolean])
		return this
	}

	/** Add an exists clause to the query. */
	whereExists(callback: Closure, boolean: string = 'and', not: boolean = false): QueryBuilder {
		this.#addMethodToQuery('whereExists', [callback, boolean, not])
		return this
	}

	/** Add an or exists clause to the query. */
	orWhereExists(callback: Closure, not: boolean = false): QueryBuilder {
		this.#addMethodToQuery('orWhereExists', [callback, not])
		return this
	}

	/** Add a where not exists clause to the query. */
	whereNotExists(callback: Closure, boolean: string = 'and'): QueryBuilder {
		this.#addMethodToQuery('whereNotExists', [callback, boolean])
		return this
	}

	/** Add a where not exists clause to the query. */
	orWhereNotExists(callback: Closure): QueryBuilder {
		this.#addMethodToQuery('orWhereNotExists', [callback])
		return this
	}

	/** Add an exists clause to the query. */
	/** addWhereExistsQuery(query: Closure, boolean: string = 'and', not: boolean = false): QueryBuilder */
	addWhereExistsQuery(query: Closure, boolean: string = 'and', not: boolean = false): QueryBuilder {
		this.#addMethodToQuery('addWhereExistsQuery', [query, boolean, not])
		return this
	}

	/** Adds a where condition using row values. */
	/** whereRowValues(columns: Column[], operator: Operator, values: string[]|number[], boolean: string = 'and'): QueryBuilder */
	whereRowValues(
		columns: Column[],
		operator: Operator,
		values: string[] | number[],
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereRowValues', [columns, operator, values, boolean])
		return this
	}

	/** Adds an or where condition using row values. */
	orWhereRowValues(
		columns: Column[],
		operator: Operator,
		values: string[] | number[],
	): QueryBuilder {
		this.#addMethodToQuery('orWhereRowValues', [columns, operator, values])
		return this
	}

	/** Add a "where JSON contains" clause to the query. */
	whereJsonContains(
		column: string,
		value: string | number,
		boolean: string = 'and',
		not: boolean = false,
	): QueryBuilder {
		this.#addMethodToQuery('whereJsonContains', [column, value, boolean, not])
		return this
	}

	/** Add an "or where JSON contains" clause to the query. */
	orWhereJsonContains(column: string, value: string | number): QueryBuilder {
		this.#addMethodToQuery('orWhereJsonContains', [column, value])

		return this
	}

	/** Add a "where JSON not contains" clause to the query. */
	whereJsonDoesntContain(
		column: string,
		value: string | number,
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereJsonDoesntContain', [column, value, boolean])
		return this
	}

	/** Add an "or where JSON not contains" clause to the query. */
	orWhereJsonDoesntContain(column: string, value: string | number): QueryBuilder {
		this.#addMethodToQuery('orWhereJsonDoesntContain', [column, value])
		return this
	}

	/** Add a clause that determines if a JSON path exists to the query. */
	whereJsonContainsKey(
		column: string,
		boolean: string = 'and',
		not: boolean = false,
	): QueryBuilder {
		this.#addMethodToQuery('whereJsonContainsKey', [column, boolean, not])
		return this
	}

	/** Add an "or" clause that determines if a JSON path exists to the query. */
	orWhereJsonContainsKey(column: string): QueryBuilder {
		this.#addMethodToQuery('orWhereJsonContainsKey', [column])
		return this
	}

	/** Add a clause that determines if a JSON path does not exist to the query. */
	whereJsonDoesntContainKey(column: string, boolean: string = 'and'): QueryBuilder {
		this.#addMethodToQuery('whereJsonDoesntContainKey', [column, boolean])
		return this
	}

	/** Add an "or" clause that determines if a JSON path does not exist to the query. */
	orWhereJsonDoesntContainKey(column: string): QueryBuilder {
		this.#addMethodToQuery('orWhereJsonDoesntContainKey', [column])
		return this
	}

	/** Add a "where JSON length" clause to the query. */
	whereJsonLength(
		column: string,
		operator: Operator,
		value: string | number | null,
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereJsonLength', [column, operator, value, boolean])
		return this
	}

	/** Add an "or where JSON length" clause to the query. */
	orWhereJsonLength(
		column: string,
		operator: Operator,
		value: string | number | null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereJsonLength', [column, operator, value])
		return this
	}

	/** Add a "where fulltext" clause to the query. */
	whereFullText(
		columns: Column | Column[],
		value: string,
		options: string[] = [],
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereFullText', [columns, value, options, boolean])
		return this
	}

	/** Add a "or where fulltext" clause to the query. */
	orWhereFullText(columns: Column | Column[], value: string, options: string[] = []): QueryBuilder {
		this.#addMethodToQuery('orWhereFullText', [columns, value, options])
		return this
	}

	/** Add a "where" clause to the query for multiple columns with "and" conditions between them. */
	/** whereAll(columns: Column[], operator: Operator|null, value: string|number|null, boolean: string = 'and'): QueryBuilder */
	whereAll(
		columns: Column[],
		operator: Operator | null,
		value: string | number | null,
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereAll', [columns, operator, value, boolean])
		return this
	}

	/** Add an "or where" clause to the query for multiple columns with "and" conditions between them. */
	orWhereAll(
		columns: Column[],
		operator: Operator | null = null,
		value: string | number | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereAll', [columns, operator, value])
		return this
	}

	/** Add an "where" clause to the query for multiple columns with "or" conditions between them. */
	whereAny(
		columns: Column[],
		operator: Operator | null = null,
		value: string | number | null = null,
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('whereAny', [columns, operator, value, boolean])
		return this
	}

	/** Add an "or where" clause to the query for multiple columns with "or" conditions between them. */
	orWhereAny(
		columns: Column[],
		operator: Operator | null = null,
		value: string | number | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereAny', [columns, operator, value])
		return this
	}

	/** Add a "group by" clause to the query. */
	groupBy(...groups: Column[]): QueryBuilder {
		this.#addMethodToQuery('groupBy', groups)
		return this
	}

	/** Add a "having" clause to the query. */
	having(
		column: Column,
		operator: Operator | null = null,
		value: string | number | null = null,
		boolean: string = 'and',
	): QueryBuilder {
		this.#addMethodToQuery('having', [column, operator, value, boolean])
		return this
	}

	/** Add an "or having" clause to the query. */
	orHaving(
		column: Column,
		operator: Operator | null = null,
		value: string | number | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orHaving', [column, operator, value])
		return this
	}

	/** Add a nested having statement to the query. */
	havingNested(callback: Closure, boolean: string = 'and'): QueryBuilder {
		this.#addMethodToQuery('havingNested', [callback, boolean])
		return this
	}

	/** Add a "having null" clause to the query. */
	havingNull(columns: Column[], boolean: string = 'and', not: boolean = false): QueryBuilder {
		this.#addMethodToQuery('havingNull', [columns, boolean, not])
		return this
	}

	/** Add an "or having null" clause to the query. */
	orHavingNull(column: Column): QueryBuilder {
		this.#addMethodToQuery('orHavingNull', [column])
		return this
	}

	/** Add a "having not null" clause to the query. */
	havingNotNull(columns: Column[], boolean: string = 'and'): QueryBuilder {
		this.#addMethodToQuery('havingNotNull', [columns, boolean])
		return this
	}

	/** Add an "or having not null" clause to the query. */
	orHavingNotNull(column: Column): QueryBuilder {
		this.#addMethodToQuery('orHavingNotNull', [column])
		return this
	}

	/** Add a "having between " clause to the query. */
	/** havingBetween(column: Column, iterable: [string|number, string|number], boolean: string = 'and', not: boolean = false): QueryBuilder */
	havingBetween(
		column: Column,
		iterable: [string | number, string | number],
		boolean: string = 'and',
		not: boolean = false,
	): QueryBuilder {
		this.#addMethodToQuery('havingBetween', [column, iterable, boolean, not])
		return this
	}

	/** Add an "order by" clause to the query. */
	orderBy(column: Column, direction: 'asc' | 'desc' = 'asc'): QueryBuilder {
		this.#addMethodToQuery('orderBy', [column, direction])
		return this
	}

	/** Add a descending "order by" clause to the query. */
	orderByDesc(column: Column): QueryBuilder {
		this.#addMethodToQuery('orderByDesc', [column])
		return this
	}

	/** Put the query's results in random order. */
	inRandomOrder(seed: string | number = ''): QueryBuilder {
		this.#addMethodToQuery('inRandomOrder', [seed])
		return this
	}

	/** Alias to set the "offset" value of the query. */
	skip(value: number): QueryBuilder {
		this.#addMethodToQuery('skip', [value])
		return this
	}

	/** Set the "offset" value of the query. */
	offset(value: number): QueryBuilder {
		this.#addMethodToQuery('offset', [value])
		return this
	}

	/** Alias to set the "limit" value of the query. */
	take(value: number): QueryBuilder {
		this.#addMethodToQuery('take', [value])
		return this
	}

	/** Set the "limit" value of the query. */
	limit(value: number): QueryBuilder {
		this.#addMethodToQuery('limit', [value])
		return this
	}

	/** Set the limit and offset for a given page. */
	forPage(page: number, perPage: number = 15): QueryBuilder {
		this.#addMethodToQuery('forPage', [page, perPage])
		return this
	}

	/** Constrain the query to the previous "page" of results before a given ID. */
	forPageBeforeId(
		perPage: number = 15,
		lastId: ID | null = null,
		column: Column = 'id',
	): QueryBuilder {
		this.#addMethodToQuery('forPageBeforeId', [perPage, lastId, column])
		return this
	}

	/** Constrain the query to the next "page" of results after a given ID. */
	forPageAfterId(
		perPage: number = 15,
		lastId: ID | null = 'null',
		column: Column = 'id',
	): QueryBuilder {
		this.#addMethodToQuery('forPageAfterId', [perPage, lastId, column])
		return this
	}

	/** Remove all existing orders and optionally add a new order. */
	reorder(column: Column | null = null, direction: 'asc' | 'desc' = 'asc'): QueryBuilder {
		this.#addMethodToQuery('reorder', [column, direction])
		return this
	}

	/** Add a union statement to the query. */
	union(query: Closure, all: boolean = false): QueryBuilder {
		this.#addMethodToQuery('union', [query, all])
		return this
	}

	/** Add a union all statement to the query. */
	unionAll(query: Closure): QueryBuilder {
		this.#addMethodToQuery('unionAll', [query])
		return this
	}

	/** Add a relationship count / exists condition to the query. */
	has(
		relation: Relation,
		operator: Operator = '>=',
		count: number = 1,
		boolean: string = 'and',
		callback: Closure | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('has', [relation, operator, count, boolean, callback])
		return this
	}

	/** Add nested relationship count / exists conditions to the query. */
	hasNested(
		relations: Relation,
		operator: Operator = '>=',
		count: number = 1,
		boolean: string = 'and',
		callback: Closure | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('hasNested', [relations, operator, count, boolean, callback])
		return this
	}

	/** Add a relationship count / exists condition to the query with an "or". */
	orHas(relation: Relation, operator: Operator = '>=', count: number = 1): QueryBuilder {
		this.#addMethodToQuery('orHas', [relation, operator, count])
		return this
	}

	/** Add a relationship count / exists condition to the query. */
	doesntHave(
		relation: Relation,
		boolean: string = 'and',
		callback: Closure | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('doesntHave', [relation, boolean, callback])
		return this
	}

	/** Add a relationship count / exists condition to the query with an "or". */
	orDoesntHave(relation: Relation): QueryBuilder {
		this.#addMethodToQuery('orDoesntHave', [relation])
		return this
	}

	/** Add a relationship count / exists condition to the query with where clauses. */
	whereHas(
		relation: Relation,
		callback: Closure | null = null,
		operator: Operator = '>=',
		count: number = 1,
	): QueryBuilder {
		this.#addMethodToQuery('whereHas', [relation, callback, operator, count])
		return this
	}

	/** Add a relationship count / exists condition to the query with where clauses. */
	withWhereHas(
		relation: Relation,
		callback: Closure | null = null,
		operator: Operator = '>=',
		count: number = 1,
	): QueryBuilder {
		this.#addMethodToQuery('withWhereHas', [relation, callback, operator, count])
		return this
	}

	/** Add a relationship count / exists condition to the query with where clauses and an "or". */
	orWhereHas(
		relation: Relation,
		callback: Closure | null = null,
		operator: Operator = '>=',
		count: number = 1,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereHas', [relation, callback, operator, count])
		return this
	}

	/** Add a relationship count / exists condition to the query with where clauses. */
	whereDoesntHave(relation: Relation, callback: Closure | null = null): QueryBuilder {
		this.#addMethodToQuery('whereDoesntHave', [relation, callback])
		return this
	}

	/** Add a relationship count / exists condition to the query with where clauses and an "or". */
	orWhereDoesntHave(relation: Relation, callback: Closure | null = null): QueryBuilder {
		this.#addMethodToQuery('orWhereDoesntHave', [relation, callback])
		return this
	}

	/** Add a polymorphic relationship count / exists condition to the query. */
	hasMorph(
		relation: Relation,
		types: string | string[],
		operator: Operator = '>=',
		count: number = 1,
		boolean: string = 'and',
		callback: Closure | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('hasMorph', [relation, types, operator, count, boolean, callback])
		return this
	}

	/** Add a polymorphic relationship count / exists condition to the query with an "or". */
	orHasMorph(
		relation: Relation,
		types: string | string[],
		operator: Operator = '>=',
		count: number = 1,
	): QueryBuilder {
		this.#addMethodToQuery('orHasMorph', [relation, types, operator, count])
		return this
	}

	/** Add a polymorphic relationship count / exists condition to the query. */
	doesntHaveMorph(
		relation: Relation,
		types: string | string[],
		boolean: string = 'and',
		callback: Closure | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('doesntHaveMorph', [relation, types, boolean, callback])
		return this
	}

	/** Add a polymorphic relationship count / exists condition to the query with an "or". */
	orDoesntHaveMorph(relation: Relation, types: string | string[]): QueryBuilder {
		this.#addMethodToQuery('orDoesntHaveMorph', [relation, types])
		return this
	}

	/** Add a polymorphic relationship count / exists condition to the query with where clauses. */
	whereHasMorph(
		relation: Relation,
		types: string | string[],
		callback: Closure | null = null,
		operator: Operator = '>=',
		count: number = 1,
	): QueryBuilder {
		this.#addMethodToQuery('whereHasMorph', [relation, types, callback, operator, count])
		return this
	}

	/** Add a polymorphic relationship count / exists condition to the query with where clauses and an "or". */
	orWhereHasMorph(
		relation: Relation,
		types: string | string[],
		callback: Closure | null = null,
		operator: Operator = '>=',
		count: number = 1,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereHasMorph', [relation, types, callback, operator, count])
		return this
	}

	/** Add a polymorphic relationship count / exists condition to the query with where clauses. */
	whereDoesntHaveMorph(
		relation: Relation,
		types: string | string[],
		callback: Closure | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('whereDoesntHaveMorph', [relation, types, callback])
		return this
	}

	/** Add a polymorphic relationship count / exists condition to the query with where clauses and an "or". */
	orWhereDoesntHaveMorph(
		relation: Relation,
		types: string | string[],
		callback: Closure | null = null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereDoesntHaveMorph', [relation, types, callback])
		return this
	}

	/** Add a basic where clause to a relationship query. */
	whereRelation(
		relation: Relation,
		column: Column,
		operator: Operator | null,
		value: string | number | null,
	): QueryBuilder {
		this.#addMethodToQuery('whereRelation', [relation, column, operator, value])
		return this
	}

	/** Add an "or where" clause to a relationship query. */
	orWhereRelation(
		relation: Relation,
		column: Column,
		operator: Operator | null,
		value: string | number | null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereRelation', [relation, column, operator, value])
		return this
	}

	/** Add a polymorphic relationship condition to the query with a where clause. */
	whereMorphRelation(
		relation: Relation,
		types: string | string[],
		column: Column,
		operator: Operator | null,
		value: string | number | null,
	): QueryBuilder {
		this.#addMethodToQuery('whereMorphRelation', [relation, types, column, operator, value])
		return this
	}

	/** Add a polymorphic relationship condition to the query with an "or where" clause. */
	orWhereMorphRelation(
		relation: Relation,
		types: string | string[],
		column: Column,
		operator: Operator | null,
		value: string | number | null,
	): QueryBuilder {
		this.#addMethodToQuery('orWhereMorphRelation', [relation, types, column, operator, value])
		return this
	}

	/** Add a morph-to relationship condition to the query. */
	whereMorphedTo(relation: Relation, model: string, boolean: string = 'and'): QueryBuilder {
		this.#addMethodToQuery('whereMorphedTo', [relation, model, boolean])
		return this
	}

	/** Add a not morph-to relationship condition to the query. */
	whereNotMorphedTo(relation: Relation, model: string, boolean: string = 'and'): QueryBuilder {
		this.#addMethodToQuery('whereNotMorphedTo', [relation, model, boolean])
		return this
	}

	/** Add a morph-to relationship condition to the query with an "or where" clause. */
	orWhereMorphedTo(relation: Relation, model: string): QueryBuilder {
		this.#addMethodToQuery('orWhereMorphedTo', [relation, model])
		return this
	}

	/** Add a not morph-to relationship condition to the query with an "or where" clause. */
	orWhereNotMorphedTo(relation: Relation, model: string): QueryBuilder {
		this.#addMethodToQuery('orWhereNotMorphedTo', [relation, model])
		return this
	}
}
