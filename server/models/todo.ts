import { Table, Column, Model, AllowNull } from 'sequelize-typescript';

@Table({
	modelName: 'Todo',
})
export default class Todo extends Model {
	@AllowNull(false)
	@Column({ primaryKey: true })
	id: number;

	@Column
	title: string;

	@Column
	done: boolean;
}
